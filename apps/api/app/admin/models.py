from __future__ import annotations

from fastapi_admin.models import AbstractAdmin
from tortoise import fields
from tortoise import models as tortoise_models


class AdminUser(AbstractAdmin):
    is_active = fields.BooleanField(default=True)
    created_at = fields.DatetimeField(auto_now_add=True, use_tz=True)

    class Meta:
        table = "admin_users"


class City(tortoise_models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)

    class Meta:
        table = "cities"

    def __str__(self) -> str:
        return self.name


class EducationLevel(tortoise_models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)

    class Meta:
        table = "education_levels"

    def __str__(self) -> str:
        return self.name


class Fund(tortoise_models.Model):
    id = fields.IntField(pk=True)
    slug = fields.CharField(max_length=100, unique=True)
    name = fields.CharField(max_length=255)
    url = fields.CharField(max_length=500)
    is_expert = fields.BooleanField(default=False)
    active_projects = fields.IntField(default=0)
    help_money = fields.CharField(max_length=500)
    cities = fields.JSONField(default=list)
    main_city = fields.CharField(max_length=255)
    image = fields.CharField(max_length=500)
    recipients = fields.JSONField(default=list)

    class Meta:
        table = "funds"

    def __str__(self) -> str:
        return self.name


class MasterclassRequest(tortoise_models.Model):
    id = fields.UUIDField(pk=True)
    first_name = fields.CharField(max_length=100)
    last_name = fields.CharField(max_length=100)
    middle_name = fields.CharField(max_length=100, null=True)
    phone = fields.CharField(max_length=32)
    email = fields.CharField(max_length=255)
    city: fields.ForeignKeyRelation[City] = fields.ForeignKeyField(
        "models.City",
        related_name="masterclass_requests",
        source_field="city_id",
    )
    education: fields.ForeignKeyRelation[EducationLevel] = fields.ForeignKeyField(
        "models.EducationLevel",
        related_name="masterclass_requests",
        source_field="education_id",
    )
    description = fields.CharField(max_length=2000)
    account_id = fields.IntField()
    created_at = fields.DatetimeField(auto_now_add=True, use_tz=True)

    class Meta:
        table = "masterclass_requests"

    def __str__(self) -> str:
        return f"{self.last_name} {self.first_name}"


class MentorshipRequest(tortoise_models.Model):
    id = fields.UUIDField(pk=True)
    first_name = fields.CharField(max_length=100)
    last_name = fields.CharField(max_length=100)
    middle_name = fields.CharField(max_length=100, null=True)
    phone = fields.CharField(max_length=32)
    email = fields.CharField(max_length=255)
    account_id = fields.IntField()
    city: fields.ForeignKeyRelation[City] = fields.ForeignKeyField(
        "models.City",
        related_name="mentorship_requests",
        source_field="city_id",
        null=True,
    )
    education: fields.ForeignKeyRelation[EducationLevel] = fields.ForeignKeyField(
        "models.EducationLevel",
        related_name="mentorship_requests",
        source_field="education_id",
        null=True,
    )
    description = fields.CharField(max_length=2000, null=True)
    max_account_url = fields.CharField(max_length=500, null=True)
    created_at = fields.DatetimeField(auto_now_add=True, use_tz=True)

    class Meta:
        table = "mentorship_requests"

    def __str__(self) -> str:
        return f"{self.last_name} {self.first_name}"
