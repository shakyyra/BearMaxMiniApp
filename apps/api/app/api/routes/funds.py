from __future__ import annotations

from fastapi import APIRouter, Query

from app.api.dependencies import SessionDep
from app.models.funds import FundDonateResponse, FundsQuery, FundsResponse, Pagination
from app.repositories.funds import FundRepository
from app.services.funds import FundService

router = APIRouter(prefix="/funds", tags=["funds"])


@router.get("", response_model=FundsResponse)
async def list_funds(
    session: SessionDep,
    city: str | None = Query(None),
    recipient: str | None = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
) -> FundsResponse:
    service = FundService(FundRepository(session))
    items, total = await service.list_funds(city=city, recipient=recipient, page=page, page_size=page_size)
    return FundsResponse(
        query=FundsQuery(city=city, recipient=recipient, page=page, page_size=page_size),
        pagination=Pagination(
            page=page,
            page_size=page_size,
            total=total,
            has_prev=page > 1,
            has_next=(page * page_size) < total,
        ),
        items=items,
    )


@router.get("/{slug}/donate-url", response_model=FundDonateResponse)
async def fund_donate_url(slug: str) -> FundDonateResponse:
    return FundDonateResponse(slug=slug, donate_url="https://dobro.example.org/help")
