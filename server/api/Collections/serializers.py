from rest_framework import serializers

from api.Collections.models import Collections

class CollectionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collections
        fields = ('pk','title','hash','movies')
        extra_kwargs = {
            'pk': {'read_only': True},
            'movies': {'read_only': True}
        }