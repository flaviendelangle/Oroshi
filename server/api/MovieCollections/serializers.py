from rest_framework import serializers

from api.MovieCollections.models import MovieCollections, SeenMovies
from api.Movies.serializers import MoviesSerializer


class MovieCollectionsSerializer(serializers.ModelSerializer):

    content = MoviesSerializer(many=True)

    class Meta:
        model = MovieCollections
        fields = ('pk', 'title', 'hash', 'content', 'adult_content')
        extra_kwargs = {
            'pk': {'read_only': True},
            'movies': {'read_only': True}
        }


class MovieCollectionSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieCollections
        fields = ('pk', 'title', 'hash', 'adult_content')


class MovieCollectionsWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieCollections
        fields = ('pk', 'title', 'hash', 'adult_content')
        extra_kwargs = {
            'pk': {'read_only': True},
        }


class SeenMoviesSerializer(serializers.ModelSerializer):

    class Meta:
        model = SeenMovies
        fields = ('movie', 'collection')