# Generated by Django 3.2.7 on 2021-09-22 18:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0007_todo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='user_create',
            new_name='user_creator',
        ),
    ]
