from __future__ import annotations

from app.exceptions.base import ServiceError
from app.models.common import City, EducationLevel
from app.repositories.common import CityRepository, EducationRepository


class CityService:
    def __init__(self, repository: CityRepository) -> None:
        self.repository = repository

    async def list_cities(self) -> list[City]:
        try:
            rows = await self.repository.list_cities()
        except Exception as exc:
            raise ServiceError("Не удалось получить список городов") from exc
        return [City(id=row.id, name=row.name) for row in rows]


class EducationService:
    def __init__(self, repository: EducationRepository) -> None:
        self.repository = repository

    async def list_levels(self) -> list[EducationLevel]:
        try:
            rows = await self.repository.list_levels()
        except Exception as exc:
            raise ServiceError("Не удалось получить список образований") from exc
        return [EducationLevel(id=row.id, name=row.name) for row in rows]
