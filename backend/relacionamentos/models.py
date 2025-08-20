from django.db import models
from django.conf import settings


class Seguir(models.Model):
    seguidor = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="segue", on_delete=models.CASCADE
    )
    seguido = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="seguido_por", on_delete=models.CASCADE
    )
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_togueder = ("seguidor", "seguido")
        constraint = [
            models.CheckConstraint(
                check=~models.Q(seguidor=models.F("seguido")),
                name="não_seguir_a_si_mesmo",
            )
        ]

    def __str__(self):
        return f"{self.seguidor} -> {self.seguido}"
