from django.urls import path
from .views import (
    PostagemListaCriaView,
    PostagemDetalheView,
    FeedView,
    CurtirView,
    DescurtirView,
    ComentarioListaCriaView,
    ComentarioExcluiView,
)

urlpattens = [
    # Posts
    path("posts/", PostagemListaCriaView.as_view(), name="listar_criar_postagem"),
    path("posts/<int:pk>/", PostagemDetalheView.as_view(), name="detalhe_postagem"),
    path("feed/", FeedView.as_view(), name="feed_postagens"),
    # Likes
    path("likes/", CurtirView.as_view(), name="curtir_postagem"),
    path(
        "likes/<int:postagem_id>/", DescurtirView.as_view(), name="descurtir_postagem"
    ),
    # Comentários
    path(
        "posts/<int:postagem_id>/comentarios/",
        ComentarioListaCriaView.as_view(),
        name="listar_criar_comentario",
    ),
    path(
        "posts/<int:postagem_id>/comentarios/<int:comentario_id>/",
        ComentarioExcluiView.as_view(),
        name="excluir_comentario",
    ),
]
