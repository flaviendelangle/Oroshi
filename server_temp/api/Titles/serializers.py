from rest_framework import serializers

from api.Titles.models import Titles


class TitlesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Titles
        fields = ('pk', 'title', 'language')
        extra_kwargs = {
            'pk': {'read_only': True}
        }