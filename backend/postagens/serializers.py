from rest_framework import serializers
from .models import Postagem, Curtida, Comentario


class ComentarioSerializer(serializers.ModelSerializer):
    autor_username = serializers.CharField(source="autor.username", read_only=True)

    class Meta:
        model = Comentario
        fields = ("id", "autor", "autor_username", "postagem", "conteudo", "criado_em")
        read_only_fields = ("autor", "criado_em")


class PostagemSerializer(serializers.ModelSerializer):
    autor_username = serializers.CharField(source="autor.username", read_only=True)
    qtd_curtidas = serializers.IntegerField(source="curtidas.count", read_only=True)

    class Meta:
        model = Postagem
        fields = (
            "id",
            "autor",
            "autor_username",
            "conteudo",
            "criado_em",
            "midia",
            "qtd_curtidas",
        )
        read_only_fields = ("autor", "criado_em")

    def validate_conteudo(self, value):
        if len(value) > 280:
            raise serializers.ValidationError("Post ultrapassa 280 caracteres")
        return value


class CurtidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curtida
        fields = ("id", "usuario", "postagem", "criado_em")
        read_only_fields = ("usuario", "criado_em")

    def create(self, validated_data):
        validated_data["usuario"] = self.context["request"].user
        return super().create(validated_data)
