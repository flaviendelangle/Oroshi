from django.db import models

from api.Directors.models import Directors
from api.Genres.models import Genres
from api.Titles.models import Titles
from api.Posters.models import Posters


class Movies(models.Model):

    class Meta:
        app_label = 'api'

    tmdbId = models.IntegerField(default=0)
    release = models.IntegerField(default=0)
    note = models.FloatField(default=0)

    original_language = models.CharField(max_length=4, default="")

    titles = models.ManyToManyField(Titles, verbose_name="list_of_titles")
    posters = models.ManyToManyField(Posters, verbose_name="list_of_posters")
    directors = models.ManyToManyField(Directors, verbose_name="list_of_directors")
    genres = models.ManyToManyField(Genres, verbose_name="list_of_genres")