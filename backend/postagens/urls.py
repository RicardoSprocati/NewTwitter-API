from django.urls import path
from .views import (
    ComentarioLikeToggleView,
    LikeToggleView,
    PostagemListaCriaView,
    PostagemDetalheView,
    FeedView,
    ComentarioListaCriaView,
    ComentarioExcluiView,
)

urlpatterns = [
    # Posts
    path("posts/", PostagemListaCriaView.as_view(), name="listar_criar_postagem"),
    path("posts/<int:pk>/", PostagemDetalheView.as_view(), name="detalhe_postagem"),
    path("feed/", FeedView.as_view(), name="feed_postagens"),
    # Likes
    path("likes/", LikeToggleView.as_view(), name="likes_toggle"),
    path("comentarios/like-toggle/", ComentarioLikeToggleView.as_view()),
    
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
