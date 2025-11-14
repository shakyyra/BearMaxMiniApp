from __future__ import annotations

from collections.abc import Sequence

from app.db.models import FundModel
from app.exceptions.base import ServiceError
from app.models.funds import FundItem, FundRecipient
from app.repositories.funds import FundRepository


class FundService:
    def __init__(self, repository: FundRepository) -> None:
        self.repository = repository

    async def list_funds(
        self, *, city: str | None, recipient: str | None, page: int, page_size: int
    ) -> tuple[list[FundItem], int]:
        try:
            rows = await self.repository.list_funds()
        except Exception as exc:
            raise ServiceError("Не удалось получить список фондов") from exc

        filtered = self._filter_rows(rows, city=city, recipient=recipient)
        total = len(filtered)
        start = (page - 1) * page_size
        end = start + page_size
        page_rows = filtered[start:end]
        items = [self._to_item(row) for row in page_rows]
        return items, total

    def _filter_rows(
        self, rows: Sequence[FundModel], *, city: str | None, recipient: str | None
    ) -> list[FundModel]:
        filtered: list[FundModel] = []
        for row in rows:
            if city and city not in (row.cities or []):
                continue
            if recipient:
                recipient_slugs = {rec.get("slug") for rec in (row.recipients or []) if isinstance(rec, dict)}
                if recipient not in recipient_slugs:
                    continue
            filtered.append(row)
        return filtered

    def _to_item(self, row: FundModel) -> FundItem:
        recipients = [
            FundRecipient(**recipient)
            for recipient in (row.recipients or [])
            if isinstance(recipient, dict)
        ]
        return FundItem(
            slug=row.slug,
            name=row.name,
            url=row.url,
            is_expert=row.is_expert,
            active_projects=row.active_projects,
            help_money=row.help_money,
            cities=row.cities or [],
            main_city=row.main_city,
            image=row.image,
            recipients=recipients,
        )
