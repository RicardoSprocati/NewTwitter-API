import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from ..models import Seguir

Usuario = get_user_model()


@pytest.mark.django_db
def test_relacionamento_seguir():
    # --- Criar dois usuários ---

    alice = Usuario.objects.create_user(username="alice", password="Senha123!")
    bob = Usuario.objects.create_user(username="bob", password="Senha123!")

    # --- Simular login de Alice ---

    client = APIClient()
    token = client.post(
        "/api/auth/login/",
        {"username": "alice", "password": "Senha123!"},
        format="json",
    ).json()["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # --- Alice segue Bob ---

    resp = client.post(f"/api/usuarios/{bob.username}/seguir/")
    assert resp.status_code == 201

    # --- Verificar no banco que a relação foi criada ---

    relacao = Seguir.objects.get(seguidor=alice, seguido=bob)
    assert relacao.seguidor == alice
    assert relacao.seguido == bob

    # --- Listar seguidores de Bob ---

    resp = client.get(f"/api/usuarios/{bob.username}/seguidores/")
    assert resp.status_code == 200
    seguidores = resp.json()
    assert any(s["seguidor"] == alice.id for s in seguidores)
