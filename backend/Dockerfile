FROM python:3.11-slim

# Variáveis de ambiente úteis
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VERSION=1.8.3 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    PATH="/root/.local/bin:$PATH"

WORKDIR /app

# Pacotes do sistema (psycopg2, build)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# Instalar Poetry
RUN curl -sSL https://install.python-poetry.org | python -

# Copiar manifestos primeiro (cache de deps)
COPY pyproject.toml poetry.lock* /app/

# Instalar **apenas deps de produção** (grupo "main")
RUN poetry install --only main --no-root

# Copiar o restante do código
COPY . /app

# Porta do gunicorn
EXPOSE 8000



