from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin

from api.TVShows.models import TVShows
from api.TVShows.serializers import TVShowsSerializer, TVShowsWriteSerializer
from api.TVShowCollections.models import TVShowCollections, SeenTVShows
from api.TVShowCollections.serializers import SeenTVShowsSerializer


class TVShowsViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.request.method == 'POST' :
            return TVShowsWriteSerializer
        return TVShowsSerializer

    def get_queryset(self):
        return TVShows.objects.all()

    def create(self, *args, **kwargs):
        data = super().create(*args, **kwargs).data
        data = TVShowsSerializer(self.get_queryset().get(pk=data['pk'])).data
        return Response(data);

    @detail_route(methods=['get'])
    def tmdbId(self, request, pk=None):
        result = self.get_queryset().filter(tmdbId=pk)
        if result.exists() :
            data = self.get_serializer_class()(result[0]).data
        else :
            data = { 'pk': 0 }
        return Response(data)

    @list_route(methods=['get'], url_path='serialize/tmdbId/(?P<tv_shows>[0-9,]+)')
    def serialize(self, request, pk=None, movies=''):
        tv_shows = map(lambda id: int(id), movies.split(','))
        print(tv_shows)
        data = self.get_queryset().filter(tmdbId__in=tv_shows)
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


class CollectionTVShowsViewet(NestedViewSetMixin, TVShowsViewSet):

    def list(self, *args, **kwargs):
        collection = kwargs['parent_lookup_collection_movies']
        movies = super().list(*args, **kwargs).data
        for movie in movies :
            movie['collection'] = int(collection)
        return Response(movies)

    def create(self, request, parent_lookup_collection_movies):
        collection = get_object_or_404(TVShowCollections.objects.all(), pk=parent_lookup_collection_movies)
        movie = get_object_or_404(TVShows.objects.all(), pk=request.data['pk'])
        collection.movies.add(movie)
        self.seen_update(collection, movie, request.data['seen'])
        data = TVShowsSerializer(movie).data
        data['collection'] = collection.pk
        return Response(data)

    def destroy(self, request, pk, parent_lookup_collection_movies):
        collection = get_object_or_404(TVShowCollections.objects.all(), pk=parent_lookup_collection_movies)
        movie = get_object_or_404(TVShows.objects.all(), pk=pk)
        collection.movies.remove(movie)
        data = TVShowsSerializer(movie).data
        data['collection'] = collection.pk
        return Response(data)

    def partial_update(self, request, pk, parent_lookup_collection_movies):
        collection = get_object_or_404(TVShowCollections.objects.all(), pk=parent_lookup_collection_movies)
        movie = get_object_or_404(TVShows.objects.all(), pk=pk)
        if 'seen' in request.data :
            self.seen_update(collection, movie, request.data['seen'])
        data = SeenTVShowsSerializer(SeenTVShows.objects.filter(collection=collection), many=True).data
        return Response(data)

    def seen_update(self, collection, movie, seen):
        if seen == 'true' :
            SeenTVShows.objects.create(collection=collection, movie=movie)
        else :
            obj = SeenTVShows.objects.filter(collection=collection, movie=movie)
            obj.delete()

