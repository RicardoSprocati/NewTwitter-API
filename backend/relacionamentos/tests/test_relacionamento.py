import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from relacionamentos.models import Seguir

Usuario = get_user_model()


@pytest.mark.django_db
def test_relacionamento_seguir():
    # --- Criar dois usuários ---
    alice = Usuario.objects.create_user(username="alice", password="Senha123!")
    bob   = Usuario.objects.create_user(username="bob",   password="Senha123!")

    # --- Simular login de Alice ---
    client = APIClient()
    token = client.post(
        "/api/auth/login/",
        {"username": "alice", "password": "Senha123!"},
        format="json",
    ).json()["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # --- Alice segue Bob 
    resp = client.post("/api/follow/", {"seguido": bob.id}, format="json")
    assert resp.status_code == 201
    assert Seguir.objects.filter(seguidor=alice, seguido=bob).exists() is True

    # --- Listar seguidores de Bob
    resp = client.get(f"/api/followers/{bob.username}/")
    assert resp.status_code == 200
    seguidores = resp.json()
    assert any(s["seguidor"] == alice.id for s in seguidores)

    # --- Alice deixa de seguir Bob 
    resp = client.delete(f"/api/unfollow/{bob.username}/")
    assert resp.status_code in (200, 204)
    assert Seguir.objects.filter(seguidor=alice, seguido=bob).exists() is False

