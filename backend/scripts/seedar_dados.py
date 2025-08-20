from django.contrib.auth import get_user_model
from postagens.models import Postagem


Usuario = get_user_model()


u1, _ = Usuario.objects.get_or_create(
    username="ricardo", defaults={"password": "senha"}
)
u2, _ = Usuario.objects.get_or_create(username="lilian", defaults={"password": "senha"})


if not Postagem.objects.exists():
    Postagem.objects.create(autor=u1, conteudo="Olá, mundo do Newtwitter!")
    Postagem.objects.create(autor=u2, conteudo="Primeiro post por aqui.")


print("Seeds criadas.")
