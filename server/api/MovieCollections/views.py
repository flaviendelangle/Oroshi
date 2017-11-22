from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from api.MovieCollections.models import MovieCollections, SeenMovies
from api.MovieCollections.serializers import MovieCollectionsSerializer,\
                                        MovieCollectionSettingsSerializer, \
                                        MovieCollectionsWriteSerializer, \
                                        SeenMoviesSerializer


class MovieCollectionsViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH'] :
            return MovieCollectionsWriteSerializer
        return MovieCollectionsSerializer

    def get_queryset(self):
        return MovieCollections.objects.all()

    def retrieve(self, *args, **kwargs):
        collection = get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
        data = super().retrieve(*args, **kwargs).data
        seen_movies = SeenMovies.objects.filter(collection=collection)
        data['seen'] = SeenMoviesSerializer(seen_movies, many=True).data
        return Response(data)

    def create(self, request, *args, **kwargs):
        data = super().create(request, *args, **kwargs).data
        """"
        collection_to_duplicate = request.data['duplicate']
        data = super().create(request, *args, **kwargs).data
        if len(collection_to_duplicate) == 1 and int(collection_to_duplicate[0]) > 0 :
            old_collection = get_object_or_404(self.get_queryset(), pk=collection_to_duplicate[0])
            new_collection  = get_object_or_404(self.get_queryset(), pk=data['pk'])
            for movie in old_collection.movies.all():
                new_collection.movies.add(movie)
        """
        data['type'] = 'movies'
        return Response(data)

    @list_route(methods=['get'], url_path='settings')
    def settings_list(self, request):
        data = MovieCollectionsViewSet.get_settings_list()
        return Response(data)


    @detail_route(methods=['get'], url_path='settings')
    def settings_detail(self, request, pk=None):
        data = get_object_or_404(self.get_queryset(), pk=pk)
        data = MovieCollectionSettingsSerializer(data).data
        return Response(data)

    @staticmethod
    def get_settings_list():
        data = MovieCollections.objects.all()
        return MovieCollectionSettingsSerializer(data, many=True).data
