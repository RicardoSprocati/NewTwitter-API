from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .models import Seguir
from .serializers import SeguirSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

Usuario = get_user_model()


class SeguirView(generics.CreateAPIView):
    queryset = Seguir.objects.all()
    serializer_class = SeguirSerializer


class DeixarDeSeguirView(generics.DestroyAPIView):
    serializer_class = SeguirSerializer

    def get_object(self):
        seguido_username = self.kwargs["username"]
        seguido = Usuario.objects.get(username=seguido_username)
        return Seguir.objects.get(seguidor=self.request.user, seguido=seguido)


class ListaSeguidoresView(generics.ListAPIView):
    serializer_class = SeguirSerializer

    def get_queryset(self):
        usuario = Usuario.objects.get(username=self.kwargs["username"])
        return Seguir.objects.filter(seguido=usuario).select_related("seguidor")


class ListaSeguindoView(generics.ListAPIView):
    serializer_class = SeguirSerializer

    def get_queryset(self):
        usuario = Usuario.objects.get(username=self.kwargs["username"])
        return Seguir.objects.filter(seguidor=usuario).select_related("seguido")
