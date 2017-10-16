from rest_framework import viewsets, status
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from api.Collections.models import Collections

class CollectionsViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        return DirectorsSerializer

    def get_queryset(self):
        return Collections.objects.all()