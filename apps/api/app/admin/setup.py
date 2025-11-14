from __future__ import annotations

from pathlib import Path
from typing import Optional, Sequence, Type

from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from fastapi_admin.app import app as admin_app
from fastapi_admin.providers.login import UsernamePasswordProvider
from fastapi_admin.resources import Model as ModelResource
from fastapi_admin.utils import hash_password
from redis.asyncio import Redis
from sqlalchemy.engine import make_url
from tortoise import Tortoise

from app.admin import models, resources
from app.core.config import get_settings

FASTAPI_LOGO = "https://cdn.worldvectorlogo.com/logos/fastapi.svg"
TEMPLATE_DIR = Path(__file__).resolve().parent / "templates"
ADMIN_RESOURCES: Sequence[Type[ModelResource]] = (
    resources.CityResource,
    resources.EducationResource,
    resources.FundResource,
    resources.MasterclassResource,
    resources.MentorshipResource,
)

_redis: Optional[Redis] = None
_resources_registered = False
_redirect_registered = False
_admin_mounted = False


def _tortoise_db_url(sqlalchemy_url: str) -> str:
    url = make_url(sqlalchemy_url)
    drivername = url.drivername.split("+", 1)[0]
    if drivername == "postgresql":
        drivername = "postgres"
    url = url.set(drivername=drivername)
    return url.render_as_string(hide_password=False)


async def init_admin(app: FastAPI) -> None:
    settings = get_settings()
    db_url = _tortoise_db_url(settings.database_url)
    await Tortoise.init(db_url=db_url, modules={"models": ["app.admin.models"]})
    global _redis
    _redis = Redis.from_url(settings.redis_url, encoding="utf-8", decode_responses=True)
    provider = UsernamePasswordProvider(
        admin_model=models.AdminUser,
        login_logo_url=FASTAPI_LOGO,
        login_title="Вход в BackMax Admin",
    )
    await admin_app.configure(
        redis=_redis,
        logo_url=FASTAPI_LOGO,
        template_folders=[str(TEMPLATE_DIR)],
        providers=[provider],
    )
    await _maybe_seed_default_admin(
        username=settings.admin_default_username,
        password=settings.admin_default_password,
    )
    _register_resources_once()
    _register_root_redirect_once()
    _mount_admin_once(app)


async def close_admin() -> None:
    global _redis
    if _redis is not None:
        await _redis.close()
        _redis = None
    await Tortoise.close_connections()


def _register_resources_once() -> None:
    global _resources_registered
    if _resources_registered:
        return
    admin_app.register_resources(*ADMIN_RESOURCES)
    _resources_registered = True


def _register_root_redirect_once() -> None:
    global _redirect_registered
    if _redirect_registered:
        return
    slug = _first_model_slug()

    @admin_app.get("/")
    async def admin_root(request: Request):
        if slug:
            url = request.url_for("list_view", resource=slug)
        else:
            url = request.url_for("login_view")
        return RedirectResponse(url)

    _redirect_registered = True


def _mount_admin_once(app: FastAPI) -> None:
    global _admin_mounted
    if _admin_mounted:
        return
    app.mount("/admin", admin_app)
    _admin_mounted = True


def _first_model_slug() -> str:
    for resource in admin_app.resources:
        if issubclass(resource, ModelResource):
            return resource.model.__name__.lower()
    return ""


async def _maybe_seed_default_admin(username: str | None, password: str | None) -> None:
    if not username or not password:
        return
    exists = await models.AdminUser.filter(username=username).exists()
    if exists:
        return
    await models.AdminUser.create(username=username, password=hash_password(password))
