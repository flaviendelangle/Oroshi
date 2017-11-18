from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from api.TVShowCollections.models import TVShowCollections, SeenTVShows
from api.TVShowCollections.serializers import TVShowCollectionsSerializer, \
    TVShowCollectionSettingsSerializer, \
    TVShowCollectionsWriteSerializer, \
    SeenTVShowsSerializer


class TVShowCollectionsViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH'] :
            return TVShowCollectionsWriteSerializer
        return TVShowCollectionsSerializer

    def get_queryset(self):
        return TVShowCollections.objects.all()

    def retrieve(self, *args, **kwargs):
        collection = get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
        data = super().retrieve(*args, **kwargs).data
        seen_movies = SeenTVShows.objects.filter(collection=collection)
        data['seen'] = SeenTVShowsSerializer(seen_movies, many=True).data
        return Response(data)

    def create(self, request, *args, **kwargs):
        collection_to_duplicate = request.data['duplicate']
        data = super().create(request, *args, **kwargs).data
        if len(collection_to_duplicate) == 1 and int(collection_to_duplicate[0]) > 0 :
            old_collection = get_object_or_404(self.get_queryset(), pk=collection_to_duplicate[0])
            new_collection  = get_object_or_404(self.get_queryset(), pk=data['pk'])
            for movie in old_collection.movies.all():
                new_collection.movies.add(movie)
        data['type'] = 'tv_shows'
        return Response(data)

    @list_route(methods=['get'], url_path='settings')
    def settings_list(self, request):
        data = MovieCollectionsViewSet.get_settings_list()
        return Response(data)


    @detail_route(methods=['get'], url_path='settings')
    def settings_detail(self, request, pk=None):
        data = get_object_or_404(self.get_queryset(), pk=pk)
        data = TVShowCollectionSettingsSerializer(data).data
        return Response(data)

    @staticmethod
    def get_settings_list():
        data = TVShowCollections.objects.all()
        return TVShowCollectionSettingsSerializer(data, many=True).data
