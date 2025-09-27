import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from relacionamentos.models import Seguir
from postagens.models import Postagem, Comentario

Usuario = get_user_model()


@pytest.mark.django_db
def test_criar_listar_e_excluir_comentario():
    # cria usuários
    autor = Usuario.objects.create_user(username="alice", password="Senha123!")
    comentarista = Usuario.objects.create_user(username="bob", password="Senha123!")

    # cria post da alice
    post = Postagem.objects.create(autor=autor, conteudo="Olá mundo!")

    # bob faz login
    c = APIClient()
    token = c.post(
        "/api/auth/login/",
        {"username": "bob", "password": "Senha123!"},
        format="json",
    ).json()["access"]
    c.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # bob precisa seguir a alice para poder comentar 
    Seguir.objects.create(seguidor=comentarista, seguido=autor)

    # cria comentário na rota aninhada
    resp = c.post(
        f"/api/posts/{post.id}/comentarios/",
        {"conteudo": "Muito legal!"},
        format="json",
    )
    assert resp.status_code == 201
    comentario_id = resp.json()["id"]

    # lista comentários da postagem
    resp = c.get(f"/api/posts/{post.id}/comentarios/")
    assert resp.status_code == 200
    comentarios = resp.json()
    assert any(cm["id"] == comentario_id for cm in comentarios)

    # exclui o comentário do bob usando a rota aninhada existente
    resp = c.delete(f"/api/posts/{post.id}/comentarios/{comentario_id}/")
    assert resp.status_code in (200, 204)

    # confirma que o comentário sumiu
    assert not Comentario.objects.filter(id=comentario_id).exists()
