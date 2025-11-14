from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class MentorshipRequest(BaseModel):
    first_name: str
    last_name: str
    middle_name: str | None = None
    phone: str
    email: EmailStr
    account_id: int
    city_id: int | None = None
    education_id: int | None = None
    description: str | None = Field(default=None, max_length=2000)
    max_account_url: str | None = Field(default=None, max_length=500)


class MentorshipEntry(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    middle_name: str | None
    phone: str
    email: EmailStr
    account_id: int
    created_at: datetime
    city_id: int | None = None
    education_id: int | None = None
    description: str | None = None
    max_account_url: str | None = None
