from relacionamentos.models import Seguir
from rest_framework import serializers
from .models import CurtidaComentario, Postagem, Curtida, Comentario


class ComentarioSerializer(serializers.ModelSerializer):
    autor_username = serializers.CharField(source="autor.username", read_only=True)
    qtd_curtidas = serializers.IntegerField(source="curtidas.count", read_only=True)  
    curtido_por_mim = serializers.SerializerMethodField()
    autor_avatar = serializers.SerializerMethodField()

    class Meta:
        model = Comentario
        fields = ("id", "autor", "autor_username", "autor_avatar", "postagem", "conteudo", "criado_em","qtd_curtidas", "curtido_por_mim")
        read_only_fields = ("autor", "postagem", "criado_em")

    def validate_conteudo(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("O comentário não pode ser vazio.")
        return value
    
    def get_curtido_por_mim(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return obj.curtidas.filter(usuario=request.user).exists()
    
    def get_autor_avatar(self, obj):
        avatar = getattr(obj.autor, "avatar", None)
        if not avatar:
            return None
        url = avatar.url
        request = self.context.get("request")
        return request.build_absolute_uri(url) if request else url
    
class CurtidaComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurtidaComentario
        fields = ("id", "usuario", "comentario", "criado_em")
        read_only_fields = ("usuario", "criado_em")

    def create(self, validated_data):
        validated_data["usuario"] = self.context["request"].user
        return super().create(validated_data)


class PostagemSerializer(serializers.ModelSerializer):
    autor_username = serializers.CharField(source="autor.username", read_only=True)
    qtd_curtidas = serializers.IntegerField(source="curtidas.count", read_only=True)
    curtido_por_mim = serializers.SerializerMethodField()
    pode_comentar = serializers.SerializerMethodField()
    autor_avatar = serializers.SerializerMethodField()

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
            "curtido_por_mim",
            "pode_comentar",
            "autor_avatar",
        )
        read_only_fields = ("autor", "criado_em")

    def get_curtido_por_mim(self, obj):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        if not user or not user.is_authenticated:
            return False
        return obj.curtidas.filter(usuario=user).exists()
    
    def get_pode_comentar(self, obj):
        request = self.context.get("request")
        if not request or not request.user or not request.user.is_authenticated:
            return False
        if obj.autor_id == request.user.id:
            return True
        return Seguir.objects.filter(seguidor=request.user, seguido=obj.autor).exists()


    def validate_conteudo(self, value):
        if len(value) > 280:
            raise serializers.ValidationError("Post ultrapassa 280 caracteres")
        return value
    
    def get_autor_avatar(self, obj):
        avatar = getattr(obj.autor, "avatar", None)
        if not avatar:
            return None
        url = avatar.url
        request = self.context.get("request")
        return request.build_absolute_uri(url) if request else url


class CurtidaSerializer(serializers.ModelSerializer):
    postagem = serializers.PrimaryKeyRelatedField(queryset=Postagem.objects.all())

    class Meta:
        model = Curtida
        fields = ("id", "usuario", "postagem", "criado_em")
        read_only_fields = ("usuario", "criado_em")

    def create(self, validated_data):
        validated_data["usuario"] = self.context["request"].user
        return Curtida.objects.create(**validated_data)
