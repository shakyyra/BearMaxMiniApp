from __future__ import annotations

from sqlalchemy import select

from app.db.models import FundModel
from app.repositories.base import BaseRepository


class FundRepository(BaseRepository):
    async def list_funds(self) -> list[FundModel]:
        result = await self.session.execute(select(FundModel).order_by(FundModel.name))
        return list(result.scalars().all())
