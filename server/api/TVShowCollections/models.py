from django.db import models

from api.TVShows.models import TVShows


class TVShowCollections(models.Model):
    hash = models.CharField(max_length=128, default="")
    content = models.ManyToManyField(TVShows, verbose_name="list_of_tv_shows", related_name="collection_tv_shows")

    # Summary
    title = models.CharField(max_length=1000, default="")
    adult_content = models.BooleanField(default=0)

    # Spoilers
    hide_unseen_titles = models.BooleanField(default=0)

    # Languages
    title_language = models.CharField(max_length=2, default="en")
    poster_language = models.CharField(max_length=2, default="-")


class SeenTVShows(models.Model):
    tv_show = models.ForeignKey(TVShows)
    collection = models.ForeignKey(TVShowCollections)
    seen = models.BooleanField(default=0)
