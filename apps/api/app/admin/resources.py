from __future__ import annotations

from fastapi_admin.resources import Field, Model
from fastapi_admin.widgets import displays, filters, inputs
from tortoise import Model as TortoiseModel

from app.admin import models


class CachedForeignKeyDisplay(displays.Display):
    """Lazily resolve FK ids to readable labels without N+1 queries."""

    def __init__(self, model: type[TortoiseModel], display_attr: str = "name"):
        super().__init__()
        self.model = model
        self.display_attr = display_attr

    async def render(self, request, value):
        if value is None:
            return await super().render(request, value)
        cache_key = f"_fk_cache_{self.model.__name__}_{self.display_attr}"
        cache = getattr(request.state, cache_key, None)
        if cache is None:
            records = await self.model.all().values("id", self.display_attr)
            cache = {record["id"]: record[self.display_attr] for record in records}
            setattr(request.state, cache_key, cache)
        return await super().render(request, cache.get(value, value))


class CityResource(Model):
    label = "Города"
    model = models.City
    icon = "fas fa-city"
    filters = [filters.Search(name="name", label="Название")]
    fields = [
        "id",
        Field("name", label="Название", input_=inputs.Input(), display=displays.Display()),
    ]


class EducationResource(Model):
    label = "Образование"
    model = models.EducationLevel
    icon = "fas fa-user-graduate"
    filters = [filters.Search(name="name", label="Уровень")]
    fields = [
        "id",
        Field("name", label="Уровень", input_=inputs.Input(), display=displays.Display()),
    ]


class FundResource(Model):
    label = "Фонды"
    model = models.Fund
    icon = "fas fa-hand-holding-heart"
    filters = [
        filters.Search(name="name", label="Название"),
        filters.Search(name="slug", label="Слаг"),
        filters.Search(name="main_city", label="Основной город"),
        filters.Boolean(name="is_expert", label="Экспертный"),
    ]
    fields = [
        "id",
        Field("slug", label="Слаг", input_=inputs.Input(), display=displays.Display()),
        Field("name", label="Название", input_=inputs.Input(), display=displays.Display()),
        Field("url", label="URL", input_=inputs.Input(), display=displays.Display()),
        Field("is_expert", label="Экспертный фонд", input_=inputs.Switch(), display=displays.Boolean()),
        Field("active_projects", label="Активных проектов", input_=inputs.Input(), display=displays.Display()),
        Field("help_money", label="Ссылка для пожертвований", input_=inputs.Input(), display=displays.Display()),
        Field("cities", label="Города", input_=inputs.TextArea(), display=displays.Display()),
        Field("main_city", label="Основной город", input_=inputs.Input(), display=displays.Display()),
        Field("image", label="Ссылка на изображение", input_=inputs.Input(), display=displays.Display()),
        Field("recipients", label="Получатели", input_=inputs.TextArea(), display=displays.Display()),
    ]


class MasterclassResource(Model):
    label = "Мастер-классы"
    model = models.MasterclassRequest
    icon = "fas fa-chalkboard-teacher"
    filters = [
        filters.Search(name="first_name", label="Имя"),
        filters.Search(name="last_name", label="Фамилия"),
        filters.ForeignKey(name="city_id", label="Город", model=models.City),
        filters.ForeignKey(name="education_id", label="Образование", model=models.EducationLevel),
    ]
    fields = [
        "id",
        "first_name",
        "last_name",
        Field("middle_name", label="Отчество", input_=inputs.Input(), display=displays.Display()),
        "phone",
        "email",
        Field(
            "city_id",
            label="Город",
            input_=inputs.ForeignKey(model=models.City, null=False),
            display=CachedForeignKeyDisplay(model=models.City),
        ),
        Field(
            "education_id",
            label="Образование",
            input_=inputs.ForeignKey(model=models.EducationLevel, null=False),
            display=CachedForeignKeyDisplay(model=models.EducationLevel),
        ),
        Field("description", label="Описание", input_=inputs.TextArea()),
        "account_id",
        "created_at",
    ]


class MentorshipResource(Model):
    label = "Наставничество"
    model = models.MentorshipRequest
    icon = "fas fa-hands-helping"
    filters = [
        filters.Search(name="first_name", label="Имя"),
        filters.Search(name="last_name", label="Фамилия"),
        filters.Search(name="account_id", label="Аккаунт"),
        filters.ForeignKey(name="city_id", label="Город", model=models.City),
        filters.ForeignKey(name="education_id", label="Образование", model=models.EducationLevel),
    ]
    fields = [
        "id",
        "first_name",
        "last_name",
        Field("middle_name", label="Отчество", input_=inputs.Input(), display=displays.Display()),
        "phone",
        "email",
        Field(
            "city_id",
            label="Город",
            input_=inputs.ForeignKey(model=models.City, null=True),
            display=CachedForeignKeyDisplay(model=models.City),
        ),
        Field(
            "education_id",
            label="Образование",
            input_=inputs.ForeignKey(model=models.EducationLevel, null=True),
            display=CachedForeignKeyDisplay(model=models.EducationLevel),
        ),
        Field("description", label="Описание", input_=inputs.TextArea()),
        Field("max_account_url", label="MAX аккаунт", input_=inputs.Input(), display=displays.Display()),
        "account_id",
        "created_at",
    ]
