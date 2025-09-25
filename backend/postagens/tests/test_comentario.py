import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from postagens.models import Postagem, Comentario

Usuario = get_user_model()


@pytest.mark.django_db
def test_criar_listar_e_excluir_comentario():

    #  Cria usuários

    autor = Usuario.objects.create_user(username="alice", password="Senha123!")
    comentarista = Usuario.objects.create_user(username="bob", password="Senha123!")

    #  Cria uma postagem de alice

    post = Postagem.objects.create(autor=autor, conteudo="Olá mundo!")

    # Login de bob

    c = APIClient()
    token = c.post(
        "/api/auth/login/", {"username": "bob", "password": "Senha123!"}, format="json"
    ).json()["access"]
    c.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # Criar um comentário

    resp = c.post(
        f"/api/posts/{post.id}/comentarios/",
        {"conteudo": "Muito legal!"},
        format="json",
    )
    assert resp.status_code == 201

    comentario_id = resp.json()["id"]

    # Listar comentários da postagem

    resp = c.get(f"/api/posts/{post.id}/comentarios/")
    assert resp.status_code == 200
    comentarios = resp.json()
    assert any(c["id"] == comentario_id for c in comentarios)

    # Excluir comentário

    resp = c.delete(f"/api/posts/{post.id}/comentarios/{comentario_id}/")
    assert resp.status_code == 204

    #  Verificar se comentário foi realmente removido

    assert Comentario.objects.filter(id=comentario_id).exists() is False
