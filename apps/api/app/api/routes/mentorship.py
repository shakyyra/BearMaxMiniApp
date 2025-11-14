from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter

from app.api.dependencies import SessionDep
from app.models.common import StatusResponse
from app.models.mentorship import MentorshipEntry, MentorshipRequest
from app.repositories.mentorship import MentorshipRepository
from app.services.mentorship import MentorshipService

router = APIRouter(prefix="/mentorship", tags=["mentorship"])


def _service(session: SessionDep) -> MentorshipService:
    return MentorshipService(MentorshipRepository(session))


@router.post("/request", response_model=MentorshipEntry)
async def create_mentorship_request(
    payload: MentorshipRequest,
    session: SessionDep,
) -> MentorshipEntry:
    service = _service(session)
    return await service.create_request(payload.model_dump())


@router.get("/requests/{account_id}", response_model=list[MentorshipEntry])
async def get_mentorship_requests(
    account_id: int,
    session: SessionDep,
) -> list[MentorshipEntry]:
    service = _service(session)
    return await service.list_by_account(account_id)


@router.delete("/request/{request_id}", response_model=StatusResponse)
async def delete_mentorship_request(
    request_id: UUID,
    session: SessionDep,
) -> StatusResponse:
    service = _service(session)
    await service.delete_request(request_id)
    return StatusResponse(status="ok", message="Заявка удалена")
