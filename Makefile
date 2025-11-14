PROJECT_NAME ?= backmax-mini-app
COMPOSE_FILE ?= docker-compose.yml
DOCKER_COMPOSE ?= docker compose
SERVICE ?=

DC := $(DOCKER_COMPOSE) -p $(PROJECT_NAME) -f $(COMPOSE_FILE)

.DEFAULT_GOAL := help

.PHONY: help up up-build down stop restart build logs ps clean pull

help:
	@echo "Доступные цели:"
	@echo "  up          Запустить все сервисы (SERVICE=name для конкретного сервиса)."
	@echo "  up-build    Пересобрать образы перед запуском."
	@echo "  down        Остановить контейнеры и удалить сеть."
	@echo "  stop        Остановить контейнеры без удаления ресурсов."
	@echo "  restart     Перезапустить сервисы."
	@echo "  build       Собрать образы сервисов."
	@echo "  pull        Скачать последние образы."
	@echo "  logs        Показать логи (SERVICE=name для конкретного сервиса)."
	@echo "  ps          Показать запущенные контейнеры."
	@echo "  clean       Удалить контейнеры, сети и тома."

up:
	$(DC) up -d $(SERVICE)

up-build:
	$(DC) up -d --build $(SERVICE)

down:
	$(DC) down --remove-orphans

stop:
	$(DC) stop $(SERVICE)

restart:
	$(MAKE) down
	$(MAKE) up SERVICE="$(SERVICE)"

build:
	$(DC) build $(SERVICE)

pull:
	$(DC) pull $(SERVICE)

logs:
	$(DC) logs -f $(SERVICE)

ps:
	$(DC) ps

clean:
	$(DC) down -v --remove-orphans
