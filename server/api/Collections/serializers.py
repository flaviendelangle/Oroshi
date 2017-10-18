from rest_framework import serializers

from api.Collections.models import Collections
from api.Movies.serializers import MoviesSerializer


class CollectionsSerializer(serializers.ModelSerializer):

    movies = MoviesSerializer(many=True)

    class Meta:
        model = Collections
        fields = ('pk','title','hash','movies')
        extra_kwargs = {
            'pk': {'read_only': True},
            'movies': {'read_only': True}
        }