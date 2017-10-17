from rest_framework import viewsets, status
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from api.Collections.models import Collections
from api.Collections.serializers import CollectionsSerializer

class CollectionsViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        return CollectionsSerializer

    def get_queryset(self):
        return Collections.objects.all()
