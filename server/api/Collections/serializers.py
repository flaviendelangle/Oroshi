from rest_framework import serializers

from api.Collections.models import Collections, SeenMovies
from api.Movies.serializers import MoviesSerializer


class CollectionsSerializer(serializers.ModelSerializer):

    movies = MoviesSerializer(many=True)

    class Meta:
        model = Collections
        fields = ('pk','title','hash','movies', 'adult_content')
        extra_kwargs = {
            'pk': {'read_only': True},
            'movies': {'read_only': True}
        }


class CollectionSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collections
        fields = ('pk', 'title', 'hash', 'adult_content')


class CollectionsWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collections
        fields = ('pk', 'title', 'hash', 'adult_content')
        extra_kwargs = {
            'pk': {'read_only': True},
        }


class SeenMoviesSerializer(serializers.ModelSerializer):

    class Meta:
        model = SeenMovies
        fields = ('movie', 'collection')