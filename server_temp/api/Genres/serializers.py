from rest_framework import serializers

from api.Genres.models import Genres


class GenresSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genres
        fields = ('pk', 'name', 'tmdbId')
        extra_kwargs = {
            'pk': {'read_only': True}
        }