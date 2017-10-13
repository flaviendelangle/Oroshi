from rest_framework import serializers

from api.Movies.models import Movies
from api.Directors.models import Directors

class MoviesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movies
        fields = ('title', 'release', 'directors')