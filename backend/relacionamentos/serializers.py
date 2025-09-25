from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Seguir

Usuario = get_user_model()


class SeguirSerializer(serializers.ModelSerializer):
    seguidor_username = serializers.CharField(source="seguidor.username", read_only=True)
    seguido_username  = serializers.CharField(source="seguido.username",  read_only=True)
    seguidor_avatar   = serializers.ImageField(source="seguidor.avatar", read_only=True)
    seguido_avatar    = serializers.ImageField(source="seguido.avatar",  read_only=True)

    class Meta:
        model = Seguir
        fields = ("id", "seguidor", "seguido", "seguidor_username", "seguido_username", "criado_em", "seguidor_avatar", "seguido_avatar")
        read_only_fields = ("seguidor", "criado_em")

    def validate_seguido(self, value):
        if self.context["request"].user == value:
            raise serializers.ValidationError("Você não pode seguir a si memso.")
        return value

    def create(self, validated_data):
        validated_data["seguidor"] = self.context["request"].user
        return super().create(validated_data)
