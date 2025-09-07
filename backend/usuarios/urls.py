from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegistroView, MeuPerfilView, PerfilPublicoView, TrocaSenhaView, BuscaUsuariosView

urlpatterns = [
    path("auth/register/", RegistroView.as_view(), name="registro"),
    path("auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/change-password/", TrocaSenhaView.as_view(), name="troca_senha"),
    path("users/me/", MeuPerfilView.as_view(), name="eu"),
    path("users/<str:username>/", PerfilPublicoView.as_view(), name="perfil_publico"),
    path("users/search", BuscaUsuariosView.as_view(), name="pesquisa"),
]
