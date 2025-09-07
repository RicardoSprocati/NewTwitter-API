from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q
from django.contrib.auth import get_user_model
from relacionamentos.models import Seguir
from .models import Postagem, Curtida, Comentario
from .serializers import PostagemSerializer, CurtidaSerializer, ComentarioSerializer
from .permissions import AutorOuSomenteLeitura

Usuario = get_user_model()


class PostagemListaCriaView(generics.ListCreateAPIView):
    queryset = Postagem.objects.select_related("autor").all()
    serializer_class = PostagemSerializer

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)


class PostagemDetalheView(generics.RetrieveDestroyAPIView):
    queryset = Postagem.objects.select_related("autor").all()
    serializer_class = PostagemSerializer
    permission_classes = [AutorOuSomenteLeitura]


class FeedView(generics.ListAPIView):
    serializer_class = PostagemSerializer

    def get_queryset(self):
        seguindo_ids = Seguir.objects.filter(seguidor=self.request.user).values_list(
            "seguido_id", flat=True
        )

        ids = list(seguindo_ids) + [self.request.user.id]

        return (
            Postagem.objects.filter(autor_id__in=ids)
            .select_related("autor")
            .order_by("-criado_em")
        )


class CurtirView(generics.CreateAPIView):
    serializer_class = CurtidaSerializer


class DescurtirView(generics.DestroyAPIView):
    serializer_class = CurtidaSerializer

    def get_object(self):
        postagem_id = self.kwargs["postagem_id"]
        return Curtida.objects.get(usuario=self.request.user, postagem_id=postagem_id)


class ComentarioListaCriaView(generics.ListCreateAPIView):
    serializer_class = ComentarioSerializer

    def get_queryset(self):
        return Comentario.objects.filter(
            postagem_id=self.kwargs["postagem_id"]
        ).select_related("autor")

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user, postagem_id=self.kwargs["postagem_id"])


class ComentarioExcluiView(generics.DestroyAPIView):
    serializer_class = ComentarioSerializer

    def get_object(self):
        return Comentario.objects.get(
            id=self.kwargs["comentario_id"], autor=self.request.user
        )
