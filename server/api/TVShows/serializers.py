from rest_framework import serializers

from api.TVShows.models import TVShows
from api.Directors.serializers import DirectorsSerializer
from api.Genres.serializers import GenresSerializer


class TVShowsSerializer(serializers.ModelSerializer):

    directors = DirectorsSerializer(many=True)
    genres = GenresSerializer(many=True)

    class Meta:
        model = TVShows
        fields = ('pk', 'title', 'directors', 'genres', 'tmdbId', 'note', 'poster')
        extra_kwargs = {
            'pk': {'read_only': True},
        }


class TVShowsWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = TVShows
        fields = ('pk', 'title', 'directors', 'genres', 'tmdbId', 'note', 'poster')
        extra_kwargs = {
            'pk': {'read_only': True},
        }