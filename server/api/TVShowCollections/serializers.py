from rest_framework import serializers

from api.TVShowCollections.models import TVShowCollections, SeenTVShows
from api.TVShows.serializers import TVShowsSerializer


class TVShowCollectionsSerializer(serializers.ModelSerializer):

    content = TVShowsSerializer(many=True)

    class Meta:
        model = TVShowCollections
        fields = ('pk', 'user', 'content', 'hash', 'title', 'adult_content',
                  'hide_unseen_titles', 'title_language', 'poster_language')
        extra_kwargs = {
            'pk': {'read_only': True},
            'content': {'read_only': True},
            'user': {'read_only': True}
        }


class TVShowCollectionSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = TVShowCollections
        fields = ('pk', 'user', 'hash', 'title', 'adult_content', 'public', 'hide_unseen_titles', 'title_language', 'poster_language')


class TVShowCollectionsWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = TVShowCollections
        fields = ('pk', 'user', 'hash', 'title', 'adult_content', 'public', 'hide_unseen_titles', 'title_language', 'poster_language')
        extra_kwargs = {
            'pk': {'read_only': True},
        }


class SeenTVShowsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SeenTVShows
        fields = ('tv_show', 'collection')