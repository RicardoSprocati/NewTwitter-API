import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model


Usuario = get_user_model()


@pytest.mark.django_db
def test_criar_listar_postagem():
    u = Usuario.objects.create_user(username="bob", password="12345Aa!")
    c = APIClient()
    tok = c.post(
        "/api/auth/login/", {"username": "bob", "password": "12345Aa!"}, format="json"
    ).json()["access"]
    c.credentials(HTTP_AUTHORIZATION=f"Bearer {tok}")

    r = c.post("/api/posts/", {"conteudo": "Olá Newtwitter"}, format="json")
    assert r.status_code == 201

    r = c.get("/api/posts/")
    assert r.status_code == 200
    assert len(r.json()) >= 1
