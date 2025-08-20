from django.db import models
from django.conf import settings


def caminho_midias(instance, filename):
    return f"postagens/{instance.autor_id}/{filename}"


class Postagem(models.Model):
    autor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    conteudo = models.CharField(max_length=280)
    midia = models.FileField(upload_to=caminho_midias, null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-criado_em",)

    def __str__(self):
        return f"{self.autor} - {self.conteudo[:30]}"


class Curtida(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    postagem = models.ForeignKey(
        Postagem, on_delete=models.CASCADE, related_name="curtidas"
    )
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("usuario", "postagem")


class Comentario(models.Model):
    autor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    postagem = models.ForeignKey(
        Postagem, on_delete=models.CASCADE, related_name="comentarios"
    )
    conteudo = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("criado_em",)
