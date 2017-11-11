from django.db import models

from api.TVShows.models import TVShows


class TVShowCollections(models.Model):
    title = models.CharField(max_length=1000, default="")
    hash = models.CharField(max_length=128, default="")
    content = models.ManyToManyField(TVShows, verbose_name="list_of_movies", related_name="collection_tvshows")
    adult_content = models.BooleanField(default=0)


class SeenTVShows(models.Model):
    tv_show = models.ForeignKey(TVShows)
    collection = models.ForeignKey(TVShowCollections)
    seen = models.BooleanField(default=0)