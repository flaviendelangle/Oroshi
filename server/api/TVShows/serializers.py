from rest_framework import serializers

from api.TVShows.models import TVShows
from api.Networks.serializers import NetworksSerializer
from api.Genres.serializers import GenresSerializer
from api.Titles.serializers import TitlesSerializer
from api.Posters.serializers import PostersSerializer


class TVShowsSerializer(serializers.ModelSerializer):

    networks = NetworksSerializer(many=True)
    genres = GenresSerializer(many=True)
    titles = TitlesSerializer(many=True)
    posters = PostersSerializer(many=True)

    class Meta:
        model = TVShows
        fields = ('pk', 'titles', 'posters', 'networks', 'genres', 'tmdbId', 'note', 'original_language')
        extra_kwargs = {
            'pk': {'read_only': True},
            'titles': {'read_only': True},
            'posters': {'read_only': True}
        }


class TVShowsWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = TVShows
        fields = ('pk', 'networks', 'genres', 'tmdbId', 'note', 'original_language')
        extra_kwargs = {
            'pk': {'read_only': True}
        }