from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import Usuario

class RegistroSerializer(serializers.ModelSerializer):
    senha = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ("username", "email", "display_name", "senha")

    def validate_senha(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        senha = validated_data.pop("senha")
        usuario = Usuario(**validated_data)
        usuario.set_password(senha)
        usuario.save()
        return usuario


class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ("id","username", "email", "display_name", "avatar", "bio")
        read_only_fields = ("username",)


class TrocaSenhaSerializer(serializers.Serializer):
    senha_atual = serializers.CharField(write_only=True)
    nova_senha = serializers.CharField(write_only=True)

    def validate_nova_senha(self, value):
        validate_password(value)
        return value
