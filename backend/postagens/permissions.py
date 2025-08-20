from rest_framework.permissions import BasePermission


class AutorOuSomenteLeitura(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ("GET",):
            return True
        return getattr(obj, "autor", None) == request.user
