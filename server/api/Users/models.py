from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UsersManager(BaseUserManager):

    def create_user(self, username, password, email):
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=254, unique=True)
    username = models.TextField(max_length=50, unique=True)

    objects = UsersManager()

    USERNAME_FIELS = 'username'
    REQUIRED_FIELDS = ['email', 'password']
