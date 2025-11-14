from __future__ import annotations

from typing import Any, Mapping
from uuid import UUID

from app.db.models import MentorshipRequestModel
from app.exceptions.base import NotFoundError, ServiceError
from app.models.mentorship import MentorshipEntry
from app.repositories.mentorship import MentorshipRepository


class MentorshipService:
    def __init__(self, repository: MentorshipRepository) -> None:
        self.repository = repository

    async def create_request(self, payload: Mapping[str, Any]) -> MentorshipEntry:
        try:
            instance = await self.repository.add_request(payload)
        except Exception as exc:
            raise ServiceError("Не удалось создать заявку наставника") from exc
        return self._to_entry(instance)

    async def list_by_account(self, account_id: int) -> list[MentorshipEntry]:
        try:
            rows = await self.repository.list_by_account(account_id)
        except Exception as exc:
            raise ServiceError("Не удалось получить заявки наставника") from exc
        return [self._to_entry(row) for row in rows]

    async def delete_request(self, request_id: UUID) -> None:
        try:
            deleted = await self.repository.delete_request(request_id)
        except Exception as exc:
            raise ServiceError("Не удалось удалить заявку наставника") from exc
        if not deleted:
            raise NotFoundError("Заявка наставника не найдена")

    def _to_entry(self, row: MentorshipRequestModel) -> MentorshipEntry:
        return MentorshipEntry(
            id=row.id,
            first_name=row.first_name,
            last_name=row.last_name,
            middle_name=row.middle_name,
            phone=row.phone,
            email=row.email,
            account_id=row.account_id,
            created_at=row.created_at,
            city_id=row.city_id,
            education_id=row.education_id,
            description=row.description,
            max_account_url=row.max_account_url,
        )
