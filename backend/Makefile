.PHONY: run migrate test lint format seed superuser


run:
poetry run python manage.py runserver 0.0.0.0:8000


migrate:
poetry run python manage.py makemigrations && poetry run python manage.py migrate


superuser:
poetry run python manage.py createsuperuser


test:
poetry run pytest


lint:
poetry run ruff check . && poetry run black --check . && poetry run isort --check-only .


format:
poetry run black . && poetry run isort .


seed:
poetry run python scripts/seedar_dados.py