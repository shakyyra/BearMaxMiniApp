from __future__ import annotations

from typing import Any, Mapping
from uuid import UUID

from sqlalchemy import delete, select

from app.db.models import MentorshipRequestModel
from app.repositories.base import BaseRepository


class MentorshipRepository(BaseRepository):
    async def add_request(self, payload: Mapping[str, Any]) -> MentorshipRequestModel:
        instance = MentorshipRequestModel(**payload)
        await self.add(instance)
        await self.commit()
        return instance

    async def delete_request(self, request_id: UUID) -> bool:
        result = await self.session.execute(
            delete(MentorshipRequestModel).where(MentorshipRequestModel.id == request_id)
        )
        await self.commit()
        return result.rowcount > 0

    async def list_by_account(self, account_id: int) -> list[MentorshipRequestModel]:
        result = await self.session.execute(
            select(MentorshipRequestModel).where(MentorshipRequestModel.account_id == account_id)
        )
        return list(result.scalars())
