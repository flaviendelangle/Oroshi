from django.db import models

from api.Directors.models import Directors
from api.Genres.models import Genres


class TVShows(models.Model):
    title = models.CharField(max_length=1000, default="")
    tmdbId = models.IntegerField(default=0)
    note = models.FloatField(default=0)
    directors = models.ManyToManyField(Directors, verbose_name="list_of_directors")
    genres = models.ManyToManyField(Genres, verbose_name="list_of_genres")
    poster = models.CharField(max_length=200, default="")