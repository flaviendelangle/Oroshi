from django.db import models


class Posters(models.Model):
    path = models.CharField(max_length=200, default="")
    language = models.CharField(max_length=4, default="")