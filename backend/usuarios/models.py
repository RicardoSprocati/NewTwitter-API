from django.contrib.auth.models import AbstractUser
from django.db import models


def caminho_avatar(instance, filename):
    return f"avatars/{instance.username}/{filename}"


class Usuario(AbstractUser):
    display_name = models.CharField("nome_exibicao", max_length=50, blank=True)
    avatar = models.ImageField(upload_to=caminho_avatar, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
