from rest_framework import serializers

from api.TVShows.models import TVShows
from api.Networks.serializers import NetworksSerializer
from api.Genres.serializers import GenresSerializer


class TVShowsSerializer(serializers.ModelSerializer):

    networks = NetworksSerializer(many=True)
    genres = GenresSerializer(many=True)

    class Meta:
        model = TVShows
        fields = ('pk', 'title', 'networks', 'genres', 'tmdbId', 'note', 'poster')
        extra_kwargs = {
            'pk': {'read_only': True},
        }


class TVShowsWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = TVShows
        fields = ('pk', 'title', 'networks', 'genres', 'tmdbId', 'note', 'poster')
        extra_kwargs = {
            'pk': {'read_only': True},
        }