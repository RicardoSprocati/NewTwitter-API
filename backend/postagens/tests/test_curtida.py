import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from postagens.models import Postagem, Curtida

Usuario = get_user_model()

@pytest.mark.django_db
def test_criar_e_remover_curtida():
    # cria usuários
    autor = Usuario.objects.create_user(username="alice", password="Senha123!")
    curtir_usuario = Usuario.objects.create_user(username="bob", password="Senha123!")

    # cria post
    post = Postagem.objects.create(autor=autor, conteudo="Olá mundo!")

    # login do bob
    c = APIClient()
    token = c.post(
        "/api/auth/login/",
        {"username": "bob", "password": "Senha123!"},
        format="json",
    ).json()["access"]
    c.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # curtir (toggle ON) → 201
    resp = c.post("/api/likes/", {"postagem": post.id}, format="json")
    assert resp.status_code == 201

    # existe curtida no banco
    assert Curtida.objects.filter(usuario=curtir_usuario, postagem=post).exists() is True

    # descurtir (toggle OFF) → **POST de novo**, agora 200
    resp = c.post("/api/likes/", {"postagem": post.id}, format="json")
    assert resp.status_code == 200

    # não existe mais curtida
    assert Curtida.objects.filter(usuario=curtir_usuario, postagem=post).exists() is False

