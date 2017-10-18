from rest_framework import viewsets, status
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin

from api.Movies.models import Movies
from api.Movies.serializers import MoviesSerializer

class MoviesViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        return MoviesSerializer

    def get_queryset(self):
        return Movies.objects.all()

    @detail_route(methods=['get'])
    def tmdbId(self, request, pk=None):
        result = self.get_queryset().filter(tmdbId=pk)
        if result.exists() :
            data = self.get_serializer_class()(result[0]).data
        else :
            data = { 'pk': 0 }
        return Response(data)

class CollectionMoviesViewSet(NestedViewSetMixin, MoviesViewSet):

    def get_serializer_class(self):
        return MoviesSerializer
