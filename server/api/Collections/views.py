from rest_framework import viewsets, status
from rest_framework.decorators import list_route
from rest_framework.response import Response

from api.MovieCollections.views import MovieCollectionsViewSet


class CollectionsViewSet(viewsets.ViewSet):

    @list_route(methods=['get'], url_path='settings')
    def settings_list(self, request):
        movies = MovieCollectionsViewSet.get_settings_list()
        movies = CollectionsViewSet.addType(movies, 'movies')

        data = movies

        return Response(data)

    @staticmethod
    def addType(data, type):
        for i in range(len(data)):
            data[i]['type'] = type
        return data