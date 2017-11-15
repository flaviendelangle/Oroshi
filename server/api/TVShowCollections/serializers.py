from rest_framework import serializers

from api.TVShowCollections.models import TVShowCollections, SeenTVShows
from api.TVShows.serializers import TVShowsSerializer


class TVShowCollectionsSerializer(serializers.ModelSerializer):

    content = TVShowsSerializer(many=True)

    class Meta:
        model = TVShowCollections
        fields = ('pk','title','hash','content', 'adult_content')
        extra_kwargs = {
            'pk': {'read_only': True},
            'movies': {'read_only': True}
        }


class TVShowCollectionSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = TVShowCollections
        fields = ('pk', 'title', 'hash', 'adult_content')


class TVShowCollectionsWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = TVShowCollections
        fields = ('pk', 'title', 'hash', 'adult_content')
        extra_kwargs = {
            'pk': {'read_only': True},
        }


class SeenTVShowsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SeenTVShows
        fields = ('tv_show', 'collection')