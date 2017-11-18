from django.db import models


class Titles(models.Model):
    title = models.CharField(max_length=1000, default="")
    language = models.CharField(max_length=4, default="")