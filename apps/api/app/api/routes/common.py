from __future__ import annotations

from fastapi import APIRouter

from app.api.dependencies import SessionDep
from app.models.common import City, EducationLevel
from app.repositories.common import CityRepository, EducationRepository
from app.services.common import CityService, EducationService

router = APIRouter(prefix="/common", tags=["common"])


@router.get("/cities", response_model=list[City])
async def get_cities(session: SessionDep) -> list[City]:
    service = CityService(CityRepository(session))
    return await service.list_cities()


@router.get("/education", response_model=list[EducationLevel])
async def get_education_levels(session: SessionDep) -> list[EducationLevel]:
    service = EducationService(EducationRepository(session))
    return await service.list_levels()
