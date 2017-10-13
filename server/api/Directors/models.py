from django.db import models

class Directors(models.Model):
    name = models.CharField(max_length=1000, default="")
