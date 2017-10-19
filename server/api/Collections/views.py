from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from api.Collections.models import Collections, SeenMovies
from api.Collections.serializers import CollectionsSerializer, CollectionsWriteSerializer, SeenMoviesSerializer

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
