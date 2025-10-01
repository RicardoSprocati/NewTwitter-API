FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.8.3 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Pacotes de sistema necessários (psycopg2 e builds)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# Instalar Poetry
RUN curl -sSL https://install.python-poetry.org | python -

# Copiar manifestos primeiro para cache de dependências
COPY pyproject.toml poetry.lock* /app/

# Instalar só deps "main" (sem dev)
RUN /root/.local/bin/poetry install --only main --no-root

# Copiar o restante do código
COPY . /app

# Porta do gunicorn
EXPOSE 8000


