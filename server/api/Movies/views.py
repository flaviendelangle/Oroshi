from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin

import json

from api.Movies.models import Movies
from api.Movies.serializers import MoviesSerializer, MoviesWriteSerializer
from api.MovieCollections.models import MovieCollections, SeenMovies, Cover
from api.MovieCollections.serializers import SeenMoviesSerializer
from api.Titles.models import Titles
from api.Posters.models import Posters
from api.Titles.serializers import TitlesSerializer
from api.Posters.serializers import PostersSerializer


class MoviesViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.request.method == 'POST' :
            return MoviesWriteSerializer
        return MoviesSerializer

    def get_queryset(self):
        return Movies.objects.all()

    def create(self, request):
        data = super().create(request).data
        movie = self.get_queryset().get(pk=data['pk'])

        titles = request.data.getlist('titles')
        for el in titles:
            el = json.loads(el)
            title = Titles.objects.create(title=el['title'], language=el['language'])
            movie.titles.add(title)

        posters = request.data.getlist('posters')
        for el in posters:
            el = json.loads(el)
            title = Posters.objects.create(path=el['path'], language=el['language'])
            movie.posters.add(title)

        data = MoviesSerializer(movie).data
        return Response(data)

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

    @detail_route(methods=['post'])
    def title(self, request, pk=None):
        movie = get_object_or_404(Movies.objects.all(), pk=pk)
        title = request.data['title']

        language = request.data['language']
        title = Titles.objects.create(title=title, language=language)
        movie.titles.add(title)

        data = TitlesSerializer(title).data
        return Response(data)

    @detail_route(methods=['post'])
    def poster(self, request, pk=None):
        movie = get_object_or_404(Movies.objects.all(), pk=pk)
        path = request.data['path']

        language = request.data['language']
        poster = Posters.objects.create(path=path, language=language)
        movie.posters.add(poster)

        data = PostersSerializer(poster).data
        return Response(data)


class CollectionMoviesViewSet(NestedViewSetMixin, MoviesViewSet):

    def list(self, *args, **kwargs):
        collection = kwargs['parent_lookup_collection_movies']
        movies = super().list(*args, **kwargs).data
        for movie in movies :
            movie['collection'] = int(collection)
        return Response(movies)

    def create(self, request, parent_lookup_collection_movies):
        collection = get_object_or_404(MovieCollections.objects.all(), pk=parent_lookup_collection_movies)
        movie = get_object_or_404(Movies.objects.all(), pk=request.data['pk'])
        collection.content.add(movie)
        found = False
        for i in range(3):
            if not found:
                match = Cover.objects.filter(collection=collection, position=i).count()
                if match == 0:
                    found = True
                    Cover.objects.create(collection=collection, movie=movie, position=i)


        self.seen_update(collection, movie, request.data['seen'])
        data = MoviesSerializer(movie).data
        data['collection'] = collection.pk
        return Response(data)

    def destroy(self, request, pk, parent_lookup_collection_movies):
        collection = get_object_or_404(MovieCollections.objects.all(), pk=parent_lookup_collection_movies)
        movie = get_object_or_404(Movies.objects.all(), pk=pk)
        collection.content.remove(movie)
        data = MoviesSerializer(movie).data
        data['collection'] = collection.pk
        return Response(data)

    def partial_update(self, request, pk, parent_lookup_collection_movies):
        collection = get_object_or_404(MovieCollections.objects.all(), pk=parent_lookup_collection_movies)
        movie = get_object_or_404(Movies.objects.all(), pk=pk)
        if 'seen' in request.data :
            self.seen_update(collection, movie, request.data['seen'])
        data = SeenMoviesSerializer(SeenMovies.objects.filter(collection=collection), many=True).data
        return Response(data)

    def seen_update(self, collection, movie, seen):
        if seen == 'true' :
            SeenMovies.objects.create(collection=collection, movie=movie)
        else :
            obj = SeenMovies.objects.filter(collection=collection, movie=movie)
            obj.delete()

