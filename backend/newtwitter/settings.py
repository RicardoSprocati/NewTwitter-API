from pathlib import Path
import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()
BASE_DIR = Path(__file__).resolve().parent.parent
# Variáveis de ambiente (em português)
SEGREDO_DJANGO = os.getenv("SEGREDO_DJANGO", "segredo-django-dev")
DEBUG = os.getenv("DEPURACAO", "true").lower() == "true"
ALLOWED_HOSTS = os.getenv("HOSTS_PERMITIDOS", "*").split(",")
# Banco de dados
AMBIENTE = os.getenv("AMBIENTE", "desenvolvimento")

if AMBIENTE == "producao":
    # PostgreSQL
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("PG_NOME", "newtwitter"),
            "USER": os.getenv("PG_USUARIO", "postgres"),
            "PASSWORD": os.getenv("PG_SENHA", "postgres"),
            "HOST": os.getenv("PG_HOST", "db"),
            "PORT": int(os.getenv("PG_PORTA", 5432)),
            "OPTIONS": {
                "sslmode": "require",
            },
        }
    }
else:
    # SQLite
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Terceiros
    "rest_framework",
    "drf_spectacular",
    "corsheaders",
    # Apps locais
    "usuarios",
    "relacionamentos",
    "postagens",
]
AUTH_USER_MODEL = "usuarios.Usuario"
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
ROOT_URLCONF = "newtwitter.urls"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
WSGI_APPLICATION = "newtwitter.wsgi.application"
# DRF + JWT
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}
SPECTACULAR_SETTINGS = {
    "TITLE": "API Newtwitter",
    "DESCRIPTION": "Documentação OpenAPI do Newtwitter",
    "VERSION": "1.0.0",
}
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "AUTH_HEADER_TYPES": ("Bearer",),
}
# Arquivos estáticos e mídia
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "static"
MEDIA_URL = "/midia/"
MEDIA_ROOT = BASE_DIR / "midia"

# CORS
CORS_ALLOW_ALL_ORIGINS = True
# Internacionalização
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True
SECRET_KEY = SEGREDO_DJANGO
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
