from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class Users(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=254, unique=True)
    username = models.EmailField(max_length=50, unique=True)

    USERNAME_FIELS = 'username'
    REQUIRED_FIELDS = ['email', 'password']