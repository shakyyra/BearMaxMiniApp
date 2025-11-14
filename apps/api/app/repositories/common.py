from __future__ import annotations

from sqlalchemy import select

from app.db.models import CityModel, EducationModel
from app.repositories.base import BaseRepository


class CityRepository(BaseRepository):
    async def list_cities(self) -> list[CityModel]:
        result = await self.session.execute(select(CityModel).order_by(CityModel.name))
        return list(result.scalars())


class EducationRepository(BaseRepository):
    async def list_levels(self) -> list[EducationModel]:
        result = await self.session.execute(select(EducationModel).order_by(EducationModel.name))
        return list(result.scalars())
