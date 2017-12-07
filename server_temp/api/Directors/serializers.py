from rest_framework import serializers

from api.Directors.models import Directors


class DirectorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Directors
        fields = ('pk', 'name', 'tmdbId')
        extra_kwargs = {
            'pk': {'read_only': True}
        }