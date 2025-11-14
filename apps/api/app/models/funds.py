from __future__ import annotations

from pydantic import BaseModel, HttpUrl


class FundRecipient(BaseModel):
    slug: str
    name: str


class FundItem(BaseModel):
    slug: str
    name: str
    url: HttpUrl
    is_expert: bool
    active_projects: int
    help_money: HttpUrl
    cities: list[str]
    main_city: str
    image: HttpUrl
    recipients: list[FundRecipient]


class FundsQuery(BaseModel):
    city: str | None = None
    recipient: str | None = None
    page: int
    page_size: int


class Pagination(BaseModel):
    page: int
    page_size: int
    total: int
    has_next: bool
    has_prev: bool


class FundsResponse(BaseModel):
    query: FundsQuery
    pagination: Pagination
    items: list[FundItem]


class FundDonateResponse(BaseModel):
    slug: str
    donate_url: HttpUrl
