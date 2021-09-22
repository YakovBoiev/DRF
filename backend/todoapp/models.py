from django.db import models

from authapp.models import Person


class Project(models.Model):
    name = models.CharField(
        max_length=150,
        unique=True,
        null=True
    )
    repository_link = models.CharField(
        max_length=255,
        blank=True,
    )
    users = models.ManyToManyField(Person)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.CharField(max_length=400,)
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    user_creator = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField()


