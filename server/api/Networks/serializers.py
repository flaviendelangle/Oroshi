from rest_framework import serializers

from api.Networks.models import Networks


class NetworksSerializer(serializers.ModelSerializer):

    class Meta:
        model = Networks
        fields = ('pk', 'name', 'tmdbId')
        extra_kwargs = {
            'pk': {'read_only': True}
        }