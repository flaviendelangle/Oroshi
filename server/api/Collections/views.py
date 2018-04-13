from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from api.MovieCollections.views import MovieCollectionsViewSet
from api.Users.models import Users


class CollectionsViewSet(viewsets.ViewSet):

    @detail_route(methods=['get'], url_path='settings')
    def settings_list(self, request, pk=None):
        user = get_object_or_404(Users.objects.all(), pk=pk)

        movies = MovieCollectionsViewSet.get_settings_list(user)
        movies = CollectionsViewSet.add_type(movies, 'movies')

        data = movies

        return Response(data)

    @staticmethod
    def add_type(data, type):
        for i in range(len(data)):
            data[i]['type'] = type
        return data