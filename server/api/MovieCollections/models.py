from django.db import models

from api.Movies.models import Movies
from api.Users.models import Users


class MovieCollections(models.Model):

    class Meta:
        app_label = 'api'

    hash = models.CharField(max_length=128, default="")
    content = models.ManyToManyField(Movies, verbose_name="list_of_movies", related_name="collection_movies")
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

    # Summary
    title = models.CharField(max_length=1000, default="")
    adult_content = models.BooleanField(default=0)
    public = models.BooleanField(default=0)

    # Spoilers
    hide_unseen_titles = models.BooleanField(default=0)

    # Languages
    title_language = models.CharField(max_length=2, default="en")
    poster_language = models.CharField(max_length=2, default="-")


class SeenMovies(models.Model):

    class Meta:
        app_label = 'api'

    movie = models.ForeignKey(Movies, on_delete=models.CASCADE)
    collection = models.ForeignKey(MovieCollections, on_delete=models.CASCADE)
    seen = models.BooleanField(default=0)