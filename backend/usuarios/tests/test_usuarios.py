import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

Usuario = get_user_model()

@pytest.mark.django_db
def test_registro_login_fluxo():
    c = APIClient()

    # Registro (usa "senha" conforme seu serializer)
    resp = c.post(
        "/api/auth/register/",
        {
            "username": "alice",
            "email": "alice@x.com",
            "display_name": "Alice",
            "senha": "SenhaSegura123!",
        },
        format="json",
    )
    assert resp.status_code in (200, 201), f"Registro falhou: {resp.json()}"

    # Login (TokenObtainPairView usa username/password)
    resp = c.post(
        "/api/auth/login/",
        {"username": "alice", "password": "SenhaSegura123!"},
        format="json",
    )
    assert resp.status_code == 200, f"Login falhou: {resp.json()}"
    tokens = resp.json()
    assert "access" in tokens

    # Perfil autenticado
    c.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")
    resp = c.get("/api/users/me/")
    assert resp.status_code == 200, f"/users/me/ falhou: {resp.json()}"


