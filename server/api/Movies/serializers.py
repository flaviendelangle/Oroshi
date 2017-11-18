from rest_framework import serializers

from api.Movies.models import Movies
from api.Directors.serializers import DirectorsSerializer
from api.Genres.serializers import GenresSerializer
from api.Titles.serializers import TitlesSerializer
from api.Posters.serializers import PostersSerializer


class MoviesSerializer(serializers.ModelSerializer):

    directors = DirectorsSerializer(many=True)
    genres = GenresSerializer(many=True)
    titles = TitlesSerializer(many=True)
    posters = PostersSerializer(many=True)

    class Meta:
        model = Movies
        fields = ('pk', 'titles', 'posters', 'release', 'directors', 'genres', 'tmdbId', 'note', 'original_language')
        extra_kwargs = {
            'pk': {'read_only': True},
            'titles': {'read_only': True},
            'posters': {'read_only': True}
        }


class MoviesWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movies
        fields = ('pk', 'release', 'directors', 'genres', 'tmdbId', 'note', 'original_language')
        extra_kwargs = {
            'pk': {'read_only': True}
        }