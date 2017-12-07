from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UsersManager(BaseUserManager):

    class Meta:
        app_label = 'api'

    def create_user(self, username, password, email):
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, email):
        user = self.create_user(username, password, email)
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser, PermissionsMixin):

    class Meta:
        app_label = 'api'

    email = models.EmailField(max_length=254, unique=True)
    username = models.TextField(max_length=50, unique=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

    objects = UsersManager()

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.username
