# Newtwitter


Rede social estilo Twitter construída com **Django REST Framework + JWT** no backend e **React + Vite + TypeScript** no frontend.


## Funcionalidades
- Registro, login e refresh de token
- Perfil com avatar, display name e bio
- Seguir/Deixar de seguir usuários
- Postagens (texto até 280 caracteres)
- Feed com posts de seguidos
- Curtidas e comentários


## Tecnologias
- **Backend:** Django 5, DRF, JWT (SimpleJWT), drf-spectacular
- **Frontend:** React 18, Vite, TypeScript
- **Banco:** SQLite (desenvolvimento), PostgreSQL (produção)
- **Testes:** pytest + pytest-django
- **Lint:** ruff + black + isort
- **Infra:** Docker + docker-compose, Deploy AWS (EB + S3/CloudFront)


## Setup local
### Backend
```bash
cd backend/app
poetry install
poetry run python manage.py migrate
poetry run python manage.py runserver

### Frontend
cd frontend
npm install
npm run dev

### Docker Compose
docker-compose up --build

Testes
poetry run pytest --cov