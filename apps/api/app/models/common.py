from __future__ import annotations

from pydantic import BaseModel


class City(BaseModel):
    id: int
    name: str


class EducationLevel(BaseModel):
    id: int
    name: str


class StatusResponse(BaseModel):
    status: str
    message: str
