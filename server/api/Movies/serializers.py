from rest_framework import serializers

from api.Movies.models import Movies
from api.Directors.serializers import DirectorsSerializer
from api.Genres.serializers import GenresSerializer


class MoviesSerializer(serializers.ModelSerializer):

    directors = DirectorsSerializer(many=True)
    genres = GenresSerializer(many=True)

    class Meta:
        model = Movies
        fields = ('pk', 'title', 'release', 'directors', 'genres', 'tmdbId', 'note', 'poster', 'original_language')
        extra_kwargs = {
            'pk': {'read_only': True},
        }


class MoviesWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movies
        fields = ('pk', 'title', 'release', 'directors', 'genres', 'tmdbId', 'note', 'poster', 'original_language')
        extra_kwargs = {
          'pk': {'read_only': True},
        }