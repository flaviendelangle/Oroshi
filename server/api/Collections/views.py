from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from api.Collections.models import Collections, SeenMovies
from api.Collections.serializers import CollectionsSerializer,\
                                        CollectionSettingsSerializer, \
                                        CollectionsWriteSerializer, \
                                        SeenMoviesSerializer

class CollectionsViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.request.method == 'POST' :
            return CollectionsWriteSerializer
        return CollectionsSerializer

    def get_queryset(self):
        return Collections.objects.all()

    def retrieve(self, *args, **kwargs):
        collection = get_object_or_404(Collections.objects.all(), pk=kwargs['pk'])
        data = super().retrieve(*args, **kwargs).data
        seen_movies = SeenMovies.objects.filter(collection=collection)
        data['seen'] = SeenMoviesSerializer(seen_movies, many=True).data
        return Response(data)

    def create(self, request, *args, **kwargs):
        collection_to_duplicate = request.data['duplicate']
        data = super().create(request, *args, **kwargs).data
        if len(collection_to_duplicate) == 1 and int(collection_to_duplicate[0]) > 0 :
            old_collection = get_object_or_404(self.get_queryset(), pk=collection_to_duplicate[0])
            new_collection  = get_object_or_404(self.get_queryset(), pk=data['pk'])
            for movie in old_collection.movies.all():
                new_collection.movies.add(movie)
        return Response(data)

    @list_route(methods=['get'], url_path='settings')
    def settings_list(self, request):
        data = self.get_queryset()
        data = CollectionSettingsSerializer(data, many=True).data
        return Response(data)


    @detail_route(methods=['get'], url_path='settings')
    def settings_detail(self, request, pk=None):
        data = get_object_or_404(self.get_queryset(), pk=pk)
        data = CollectionSettingsSerializer(data).data
        return Response(data)

