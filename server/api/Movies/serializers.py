from rest_framework import serializers

from api.Movies.models import Movies
from api.Directors.models import Directors

class MoviesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movies
        fields = ('pk', 'title', 'release', 'directors', 'tmdbId', 'seen')
        extra_kwargs = {
            'pk': {'read_only': True}
        }