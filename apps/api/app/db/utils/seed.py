from __future__ import annotations

from sqlalchemy import func, select

from app.db.models import CityModel, EducationModel, FundModel
from app.db.session import SessionFactory

DEFAULT_CITIES = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Нижний Новгород",
]

DEFAULT_EDUCATION_LEVELS = [
    "Среднее",
    "Среднее специальное",
    "Высшее",
]

DEFAULT_FUNDS = [
    {
        "slug": "dobro",
        "name": "Фонд Добро",
        "url": "https://dobro.mail.ru/projects/",
        "is_expert": True,
        "active_projects": 5,
        "help_money": "https://dobro.mail.ru/projects/help/",
        "cities": ["Москва", "Санкт-Петербург"],
        "main_city": "Москва",
        "image": "https://placehold.co/256x256",
        "recipients": [
            {"slug": "orphans", "name": "Дети-сироты"},
            {"slug": "disabled", "name": "Дети с ОВЗ"},
        ],
    },
    {
        "slug": "max",
        "name": "Фонд MAX",
        "url": "https://max.help",
        "is_expert": False,
        "active_projects": 3,
        "help_money": "https://max.help/donate",
        "cities": ["Екатеринбург"],
        "main_city": "Екатеринбург",
        "image": "https://placehold.co/256x256?text=MAX",
        "recipients": [
            {"slug": "teens", "name": "Подростки"},
        ],
    },
]


async def seed_reference_data() -> None:
    async with SessionFactory() as session:
        total = await session.scalar(select(func.count()).select_from(CityModel))
        if not total:
            session.add_all(CityModel(name=name) for name in DEFAULT_CITIES)
        total_edu = await session.scalar(select(func.count()).select_from(EducationModel))
        if not total_edu:
            session.add_all(EducationModel(name=name) for name in DEFAULT_EDUCATION_LEVELS)
        total_funds = await session.scalar(select(func.count()).select_from(FundModel))
        if not total_funds:
            session.add_all(FundModel(**fund) for fund in DEFAULT_FUNDS)
        await session.commit()
