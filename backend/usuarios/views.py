from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q
from .models import Usuario
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from .serializers import RegistroSerializer, PerfilSerializer, TrocaSenhaSerializer

Usuario = get_user_model()


class RegistroView(generics.CreateAPIView):
    serializer_class = RegistroSerializer
    permission_classes = [permissions.AllowAny]


class MeuPerfilView(generics.RetrieveUpdateAPIView):
    serializer_class = PerfilSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class PerfilPublicoView(generics.RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = PerfilSerializer
    lookup_field = "username"
    permission_classes = [permissions.AllowAny]


class TrocaSenhaView(generics.GenericAPIView):
    serializer_class = TrocaSenhaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        usuario = request.user

        if not check_password(
            serializer.validated_data["senha_atual"], usuario.password
        ):
            return Response({"detalhe": "Senha atual incorreta."}, status=400)
        usuario.set_password(serializer.validated_data["nova_senha"])
        usuario.save()
        return Response({"detalhe": "Senha alterada com sucesso."})
    
class BuscaUsuariosView(generics.ListAPIView):
    serializer_class = PerfilSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        q = self.request.query_params.get("q", "").strip()
        if not q:
            return Usuario.objects.none()
        
        return (
            Usuario.objects.filter(
                Q(username__icontains=q) | Q(display_name__icontains=q)
            )
            .order_by("username")[:10]
        )
