from django.shortcuts   import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from api.MovieCollections.views import MovieCollectionsViewSet
from api.TVShowCollections.views import TVShowCollectionsViewSet
from api.Users.models import Users


class CollectionsViewSet(viewsets.ViewSet):

    @detail_route(methods=['get'], url_path='settings')
    def settings_list(self, request, pk=None):
        user = get_object_or_404(Users.objects.all(), pk=pk)

        movies = MovieCollectionsViewSet.get_settings_list(user)
        movies = CollectionsViewSet.add_type(movies, 'movies')

        tv_shows = TVShowCollectionsViewSet.get_settings_list(user)
        tv_shows = CollectionsViewSet.add_type(tv_shows, 'tv_shows')

        data = movies + tv_shows

        return Response(data)

    @staticmethod
    def add_type(data, type):
        for i in range(len(data)):
            data[i]['type'] = type
        return data