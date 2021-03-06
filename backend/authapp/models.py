from django.db import models
from django.contrib.auth.models import AbstractUser


class Person(AbstractUser):
    email = models.EmailField('email address', unique=True)
