from django.core.management.base import BaseCommand
from authapp.models import Person
import json, os

JSON_PATH = 'authapp/json'


def load_from_json(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), 'r', encoding='utf-8') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        persons = load_from_json('persons')

        Person.objects.all().delete
        for person in persons:
            new_person = Person(**person)
            new_person.save()


Person.objects.create_superuser('admin', 'admin@gmail.com', 'admin', first_name='admin', last_name='admin')



