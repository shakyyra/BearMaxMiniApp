from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.admin.setup import close_admin, init_admin
from app.api.routes import common, funds, masterclass, mentorship
from app.core.config import get_settings
from app.db.base import Base
from app.db.session import engine
from app.db.utils.seed import seed_reference_data
from app.db.utils.migrations import ensure_latest_schema
from app.exceptions.handlers import register_exception_handlers


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    api_prefix = "/api/v1"
    app.include_router(common.router, prefix=api_prefix)
    app.include_router(masterclass.router, prefix=api_prefix)
    app.include_router(mentorship.router, prefix=api_prefix)
    app.include_router(funds.router, prefix=api_prefix)
    register_exception_handlers(app)
    # FastAPI-Admin already serves static assets via CDN, mounting local static not required.

    @app.on_event("startup")
    async def _startup() -> None:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            await ensure_latest_schema(conn)
        await seed_reference_data()
        await init_admin(app)

    @app.on_event("shutdown")
    async def _shutdown() -> None:
        await close_admin()

    return app


app = create_app()
