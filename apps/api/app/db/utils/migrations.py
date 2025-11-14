from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncConnection


async def ensure_latest_schema(conn: AsyncConnection) -> None:
    await _ensure_mentorship_optional_fields(conn)


async def _ensure_mentorship_optional_fields(conn: AsyncConnection) -> None:
    statements = [
        "ALTER TABLE mentorship_requests ADD COLUMN IF NOT EXISTS city_id INTEGER",
        "ALTER TABLE mentorship_requests ADD COLUMN IF NOT EXISTS education_id INTEGER",
        "ALTER TABLE mentorship_requests ADD COLUMN IF NOT EXISTS description VARCHAR(2000)",
        "ALTER TABLE mentorship_requests ADD COLUMN IF NOT EXISTS max_account_url VARCHAR(500)",
    ]
    for statement in statements:
        await conn.exec_driver_sql(statement)
