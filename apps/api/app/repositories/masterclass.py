from __future__ import annotations

from typing import Any, Mapping
from uuid import UUID

from sqlalchemy import delete, select

from app.db.models import MasterclassRequestModel
from app.repositories.base import BaseRepository


class MasterclassRepository(BaseRepository):
    async def add_request(self, payload: Mapping[str, Any]) -> MasterclassRequestModel:
        instance = MasterclassRequestModel(**payload)
        await self.add(instance)
        await self.commit()
        return instance

    async def delete_request(self, request_id: UUID) -> bool:
        result = await self.session.execute(
            delete(MasterclassRequestModel).where(MasterclassRequestModel.id == request_id)
        )
        await self.commit()
        return result.rowcount > 0

    async def list_by_account(self, account_id: int) -> list[MasterclassRequestModel]:
        result = await self.session.execute(
            select(MasterclassRequestModel).where(MasterclassRequestModel.account_id == account_id)
        )
        return list(result.scalars())
