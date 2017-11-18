from django.db import models

from api.Networks.models import Networks
from api.Genres.models import Genres
from api.Titles.models import Titles
from api.Posters.models import Posters


class TVShows(models.Model):
    tmdbId = models.IntegerField(default=0)
    note = models.FloatField(default=0)

    original_language = models.CharField(max_length=4, default="")

    titles = models.ManyToManyField(Titles, verbose_name="list_of_titles")
    posters = models.ManyToManyField(Posters, verbose_name="list_of_posters")
    networks = models.ManyToManyField(Networks, verbose_name="list_of_directors")
    genres = models.ManyToManyField(Genres, verbose_name="list_of_genres")
