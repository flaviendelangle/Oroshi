from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Movies.models import Movies
from api.Movies.serializers import MoviesSerializer

class MoviesViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        return MoviesSerializer

    def get_queryset(self):
        return Movies.objects.all()