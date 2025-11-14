from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter

from app.api.dependencies import SessionDep
from app.models.common import StatusResponse
from app.models.masterclass import MasterclassEntry, MasterclassRequest
from app.repositories.masterclass import MasterclassRepository
from app.services.masterclass import MasterclassService

router = APIRouter(prefix="/masterclass", tags=["masterclass"])


def _service(session: SessionDep) -> MasterclassService:
    return MasterclassService(MasterclassRepository(session))


@router.post("/request", response_model=MasterclassEntry)
async def create_masterclass_request(
    payload: MasterclassRequest,
    session: SessionDep,
) -> MasterclassEntry:
    service = _service(session)
    return await service.create_request(payload.model_dump())


@router.get("/requests/{account_id}", response_model=list[MasterclassEntry])
async def get_masterclass_requests(
    account_id: int,
    session: SessionDep,
) -> list[MasterclassEntry]:
    service = _service(session)
    return await service.list_by_account(account_id)


@router.delete("/request/{request_id}", response_model=StatusResponse)
async def delete_masterclass_request(
    request_id: UUID,
    session: SessionDep,
) -> StatusResponse:
    service = _service(session)
    await service.delete_request(request_id)
    return StatusResponse(status="ok", message="Заявка удалена")
