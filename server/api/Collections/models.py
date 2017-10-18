from django.db import models

from api.Movies.models import Movies

class Collections(models.Model):
    title = models.CharField(max_length=1000, default="")
    hash = models.CharField(max_length=128, default="")
    movies = models.ManyToManyField(Movies, verbose_name="list_of_movies", related_name="collection_movies")