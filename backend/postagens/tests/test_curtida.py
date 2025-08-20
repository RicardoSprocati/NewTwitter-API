import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from ..models import Postagem, Curtida

Usuario = get_user_model()


@pytest.mark.django_db
def test_criar_e_remover_curtida():

    #  Cria dois usuários

    autor = Usuario.objects.create_user(username="alice", password="Senha123!")
    curtir_usuario = Usuario.objects.create_user(username="bob", password="Senha123!")

    # Cria uma postagem de alice

    post = Postagem.objects.create(autor=autor, conteudo="Olá mundo!")

    # Login de bob

    c = APIClient()
    token = c.post(
        "/api/auth/login/", {"username": "bob", "password": "Senha123!"}, format="json"
    ).json()["access"]
    c.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # Curtir a postagem

    resp = c.post("/api/likes/", {"postagem": post.id}, format="json")
    assert resp.status_code == 201

    # Verifica se o like realmente foi criado no banco

    curtida = Curtida.objects.filter(usuario=curtir_usuario, postagem=post)
    assert curtida.exists() is True

    #  Descurtir a postagem

    resp = c.delete(f"/api/likes/{post.id}/")
    assert resp.status_code == 204

    # Verifica se o like foi removido

    curtida = Curtida.objects.filter(usuario=curtir_usuario, postagem=post)
    assert curtida.exists() is False
