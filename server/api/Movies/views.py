from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin

from api.Movies.models import Movies
from api.Movies.serializers import MoviesSerializer
from api.Collections.models import Collections

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

    @list_route(methods=['get'], url_path='serialize/tmdbId/(?P<movies>[0-9,]+)')
    def serialize(self, request, pk=None, movies=''):
        movies = map(lambda id: int(id), movies.split(','))
        data = self.get_queryset().filter(tmdbId__in=movies)
        data = self.get_serializer_class()(data, many=True).data
        return Response(data)

    @list_route(methods=['get'], url_path='exist/tmdbId/(?P<movies>[0-9,]+)')
    def exist(self, request, parent_lookup_collection_movies, pk=None, movies=''):
        movies = list(map(lambda id: int(id), movies.split(',')))
        data = list(map(lambda el: el.tmdbId, self.get_queryset().filter(tmdbId__in=movies)))
        out = {}
        for movie in movies :
            out[movie] = len(list(filter(lambda el: el == movie, data))) > 0
        return Response(out)


class CollectionMoviesViewSet(NestedViewSetMixin, MoviesViewSet):

    def create(self, request, parent_lookup_collection_movies):
        collection = get_object_or_404(Collections.objects.all(), pk=parent_lookup_collection_movies)
        movie = get_object_or_404(Movies.objects.all(), pk=request.data['pk'])
        collection.movies.add(movie)
        data = self.get_serializer_class()(movie).data
        return Response(data)

