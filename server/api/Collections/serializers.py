from rest_framework import serializers

from api.Collections.models import Collections

class DirectorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collections
        fields = ('pk',)
        extra_kwargs = {
            'pk': {'read_only': True}
        }