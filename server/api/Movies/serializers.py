from rest_framework import serializers

from api.Movies.models import Movies
from api.Directors.serializers import DirectorsSerializer


class MoviesSerializer(serializers.ModelSerializer):

    directors = DirectorsSerializer(many=True)

    class Meta:
        model = Movies
        fields = ('pk', 'title', 'release', 'directors', 'tmdbId', 'seen')
        extra_kwargs = {
            'pk': {'read_only': True}
        }