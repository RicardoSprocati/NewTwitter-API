from django.urls import path
from .views import (
    SeguirView,
    DeixarDeSeguirView,
    ListaSeguidoresView,
    ListaSeguindoView,
)

urlpatterns = [
    path("follow/", SeguirView.as_view(), name="seguir"),
    path(
        "unfollow/<str:username>/", DeixarDeSeguirView.as_view(), name="deixar_seguir"
    ),
    path("followers/<str:username>/", ListaSeguidoresView.as_view(), name="seguidores"),
    path("following/<str:username>/", ListaSeguindoView.as_view(), name="seguindo"),
]
