from django.db import models

from authapp.models import Person


class Project(models.Model):
    name = models.CharField(
        max_length=150,
        unique=True,
        null=True
    )
    repository_link = models.URLField(blank=True)
    users = models.ManyToManyField(Person)

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    short_description = models.CharField(max_length=30, null=True)
    text = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    user_creator = models.ForeignKey(
        Person,
        on_delete=models.SET_NULL,
        null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.short_description}'[:10]


