from rest_framework import serializers

from api.Posters.models import Posters


class PostersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Posters
        fields = ('pk', 'path', 'language')
        extra_kwargs = {
            'pk': {'read_only': True}
        }