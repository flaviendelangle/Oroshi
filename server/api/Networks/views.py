from rest_framework import viewsets, status
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from api.Networks.models import Networks
from api.Networks.serializers import NetworksSerializer


class NetworksViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        return NetworksSerializer

    def get_queryset(self):
        return Networks.objects.all()

    @detail_route(methods=['get'])
    def tmdbId(self, request, pk=None):
        result = self.get_queryset().filter(tmdbId=pk)
        if result.exists() :
            data = self.get_serializer_class()(result[0]).data
        else :
            data = { 'pk': 0 }
        return Response(data)