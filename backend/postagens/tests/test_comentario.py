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

    # bob passa a seguir a alice (regra da sua view para poder comentar)
    Seguir.objects.create(seguidor=comentarista, seguido=autor)

    # cria comentário na postagem da alice
    resp = c.post(
        f"/api/posts/{post.id}/comentarios/",
        {"conteudo": "Muito legal!"},
        format="json",
    )
    assert resp.status_code == 201
    comentario_id = resp.json()["id"]

    # lista comentários e verifica se o criado está lá
    resp = c.get(f"/api/posts/{post.id}/comentarios/")
    assert resp.status_code == 200
    comentarios = resp.json()
    assert any(cm["id"] == comentario_id for cm in comentarios)

    # exclui o comentário do próprio bob (rota da sua ComentarioExcluiView)
    resp = c.delete(f"/api/comentarios/{comentario_id}/")
    assert resp.status_code in (200, 204)

    # garante que o comentário sumiu
    assert Comentario.objects.filter(id=comentario_id).exists() is False
