from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class MasterclassRequest(BaseModel):
    first_name: str
    last_name: str
    middle_name: str | None = None
    phone: str
    email: EmailStr
    city_id: int
    education_id: int
    description: str = Field(max_length=2000)
    account_id: int


class MasterclassEntry(MasterclassRequest):
    id: UUID
    created_at: datetime
