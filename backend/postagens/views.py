from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.views import APIView
from django.db.models import Q, Exists, OuterRef, Count
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from relacionamentos.models import Seguir
from .models import CurtidaComentario, Postagem, Curtida, Comentario
from .serializers import PostagemSerializer, ComentarioSerializer
from .permissions import AutorOuSomenteLeitura


Usuario = get_user_model()


class PostagemListaCriaView(generics.ListCreateAPIView):
    queryset = Postagem.objects.select_related("autor").all()
    serializer_class = PostagemSerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request  
        return ctx

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
            .annotate(
                likes_count=Count("curtidas", distinct=True),
                liked_by_me=Exists(
                    Curtida.objects.filter(usuario=self.request.user, postagem=OuterRef("pk"))
                ),
            )
            .order_by("-criado_em")
        )
    
    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request  
        return ctx


class LikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        postagem_id = request.data.get("postagem")
        if not postagem_id:
            raise ValidationError({"postagem": "Obrigatório."})

        postagem = get_object_or_404(Postagem, pk=postagem_id)

        obj, created = Curtida.objects.get_or_create(
            usuario=request.user,
            postagem=postagem,
        )
        if created:
            # acabou de curtir
            return Response({"liked": True}, status=status.HTTP_201_CREATED)

        # já existia curtida → descurtir
        obj.delete()
        return Response({"liked": False}, status=status.HTTP_200_OK)
    

class ComentarioLikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        comentario_id = request.data.get("comentario")
        if not comentario_id:
            raise ValidationError({"comentario": "Obrigatório."})

        comentario = get_object_or_404(Comentario, pk=comentario_id)

        obj, created = CurtidaComentario.objects.get_or_create(
            usuario=request.user,
            comentario=comentario,
        )
        if created:
            # acabou de curtir
            return Response({"liked": True}, status=status.HTTP_201_CREATED)

        # já existia curtida → descurtir
        obj.delete()
        return Response({"liked": False}, status=status.HTTP_200_OK)



class ComentarioListaCriaView(generics.ListCreateAPIView):
    serializer_class = ComentarioSerializer

    def get_queryset(self):
        return Comentario.objects.filter(
            postagem_id=self.kwargs["postagem_id"]
        ).select_related("autor")

    def perform_create(self, serializer):
        postagem_id = self.kwargs["postagem_id"]
        postagem = Postagem.objects.select_related("autor").get(id=postagem_id)
        user = self.request.user

        if postagem.autor_id != user.id:
            segue = Seguir.objects.filter(seguidor=user, seguido=postagem.autor).exists()
            if not segue:
                raise PermissionDenied("Você precisa seguir o autor para comentar.")
            
        serializer.save(autor=user, postagem_id=postagem_id)


class ComentarioExcluiView(generics.DestroyAPIView):
    serializer_class = ComentarioSerializer

    def get_object(self):
        return Comentario.objects.get(
            id=self.kwargs["comentario_id"], autor=self.request.user
        )
