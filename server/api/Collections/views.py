from rest_framework import viewsets, status
from rest_framework.decorators import list_route
from rest_framework.response import Response

from api.MovieCollections.views import MovieCollectionsViewSet
from api.TVShowCollections.views import TVShowCollectionsViewSet


class CollectionsViewSet(viewsets.ViewSet):

    @list_route(methods=['get'], url_path='settings')
    def settings_list(self, request):
        movies = MovieCollectionsViewSet.get_settings_list(request.user)
        movies = CollectionsViewSet.addType(movies, 'movies')

        tv_shows = TVShowCollectionsViewSet.get_settings_list(request.user)
        tv_shows = CollectionsViewSet.addType(tv_shows, 'tv_shows')

        data = movies + tv_shows

        return Response(data)

    @staticmethod
    def addType(data, type):
        for i in range(len(data)):
            data[i]['type'] = type
        return data