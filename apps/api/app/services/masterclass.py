from __future__ import annotations

from typing import Any, Mapping
from uuid import UUID

from app.exceptions.base import NotFoundError, ServiceError
from app.db.models import MasterclassRequestModel
from app.models.masterclass import MasterclassEntry
from app.repositories.masterclass import MasterclassRepository


class MasterclassService:
    def __init__(self, repository: MasterclassRepository) -> None:
        self.repository = repository

    async def create_request(self, payload: Mapping[str, Any]) -> MasterclassEntry:
        try:
            instance = await self.repository.add_request(payload)
        except Exception as exc:
            raise ServiceError("Не удалось создать заявку на мастер-класс") from exc
        return self._to_entry(instance)

    async def list_by_account(self, account_id: int) -> list[MasterclassEntry]:
        try:
            rows = await self.repository.list_by_account(account_id)
        except Exception as exc:
            raise ServiceError("Не удалось получить заявки на мастер-класс") from exc
        return [self._to_entry(row) for row in rows]

    async def delete_request(self, request_id: UUID) -> None:
        try:
            deleted = await self.repository.delete_request(request_id)
        except Exception as exc:
            raise ServiceError("Не удалось удалить заявку на мастер-класс") from exc
        if not deleted:
            raise NotFoundError("Заявка на мастер-класс не найдена")

    def _to_entry(self, row: MasterclassRequestModel) -> MasterclassEntry:
        return MasterclassEntry(
            id=row.id,
            first_name=row.first_name,
            last_name=row.last_name,
            middle_name=row.middle_name,
            phone=row.phone,
            email=row.email,
            city_id=row.city_id,
            education_id=row.education_id,
            description=row.description,
            account_id=row.account_id,
            created_at=row.created_at,
        )
