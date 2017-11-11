from django.db import models

from api.Movies.models import Movies


class MovieCollections(models.Model):
    title = models.CharField(max_length=1000, default="")
    hash = models.CharField(max_length=128, default="")
    content = models.ManyToManyField(Movies, verbose_name="list_of_movies", related_name="collection_movies")
    adult_content = models.BooleanField(default=0)


class SeenMovies(models.Model):
    movie = models.ForeignKey(Movies)
    collection = models.ForeignKey(MovieCollections)
    seen = models.BooleanField(default=0)