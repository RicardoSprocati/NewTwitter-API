from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Seguir

Usuario = get_user_model()


class SeguirSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seguir
        fields = ("id", "seguidor", "seguido", "criado_em")
        read_only_fields = ("seguidor", "criado_em")

    def validate_seguido(self, value):
        if self.context["request"].user == value:
            raise serializers.ValidationError("Você não pode seguir a si memso.")

    def create(self, validated_data):
        validated_data["seguidor"] = self.context["request"].user
        return super().create(validated_data)
