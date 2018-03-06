from rest_framework import serializers

from api.MovieCollections.models import MovieCollections, SeenMovies
from api.Movies.serializers import MoviesSerializer


class MovieCollectionsSerializer(serializers.ModelSerializer):

    content = MoviesSerializer(many=True)
    cover_elements = MoviesSerializer(many=True)

    class Meta:
        model = MovieCollections
        fields = (
            'pk',
            'user',
            'content',
            'hash',
            'title',
            'adult_content',
            'hide_unseen_titles',
            'title_language',
            'poster_language',
            'cover_elements',
        )
        extra_kwargs = {
            'pk': {'read_only': True},
            'content': {'read_only': True},
            'cover_elements': {'read_only': True},
            'user': {'read_only': True}
        }


class MovieCollectionSettingsSerializer(serializers.ModelSerializer):

    cover_elements = MoviesSerializer(many=True)

    class Meta:
        model = MovieCollections
        fields = (
            'pk',
            'user',
            'hash',
            'title',
            'adult_content',
            'public',
            'hide_unseen_titles',
            'title_language',
            'poster_language',
            'cover_elements',
        )
        extra_kwargs = {
            'cover_elements': {'read_only': True},
        }


class MovieCollectionsWriteSerializer(serializers.ModelSerializer):

    cover_elements = MoviesSerializer(many=True, read_only=True)

    class Meta:
        model = MovieCollections
        fields = (
            'pk',
            'user',
            'hash',
            'title',
            'adult_content',
            'public',
            'hide_unseen_titles',
            'title_language',
            'poster_language',
            'cover_elements',
        )
        extra_kwargs = {
            'pk': {'read_only': True},
            'cover_elements': {'read_only': True},
        }


class SeenMoviesSerializer(serializers.ModelSerializer):

    class Meta:
        model = SeenMovies
        fields = ('movie', 'collection')