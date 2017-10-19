from rest_framework import serializers

from api.Movies.models import Movies
from api.Directors.serializers import DirectorsSerializer


class MoviesSerializer(serializers.ModelSerializer):

    directors = DirectorsSerializer(many=True)

    class Meta:
        model = Movies
        fields = ('pk', 'title', 'release', 'directors', 'tmdbId')
        extra_kwargs = {
            'pk': {'read_only': True},
        }

class MoviesWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movies
        fields = ('pk', 'title', 'release', 'directors', 'tmdbId')
        extra_kwargs = {
          'pk': {'read_only': True},
        }