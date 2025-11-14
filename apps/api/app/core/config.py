from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parents[3]
ENV_PATH = ROOT_DIR / ".env"
if ENV_PATH.exists():
    load_dotenv(ENV_PATH)


class Settings(BaseSettings):
    model_config = SettingsConfigDict()

    app_name: str = Field(default="BackMax Mini App")
    app_version: str = Field(default="0.1.0")
    api_host: str = Field(default="0.0.0.0")
    api_port: int = Field(default=8000)
    database_url: str = Field(default="postgresql+asyncpg://postgres:postgres@postgres:5432/backmax")
    redis_url: str = Field(default="redis://redis:6379/0")
    admin_default_username: str | None = Field(default=None)
    admin_default_password: str | None = Field(default=None)


@lru_cache
def get_settings() -> Settings:
    return Settings()
