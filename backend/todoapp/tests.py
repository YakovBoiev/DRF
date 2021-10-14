from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase
from mixer.backend.django import mixer
from .models import Project, Todo
from .views import TodoModelViewSet, ProjectModelViewSet
from authapp.models import Person


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.request = self.factory.get('/api/project/')
        self.view = TodoModelViewSet.as_view({'get': 'list'})

    def test_get_list_guest(self):
        response = self.view(self.request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_list_admin(self):
        admin = Person.objects.create_superuser('admin', 'amin@admin.gmail.com', 'admin')
        force_authenticate(self.request, admin)
        response = self.view(self.request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestPersonViewSet(TestCase):

    def test_edit_person(self):
        person = mixer.blend(Person)
        client = APIClient()
        admin = Person.objects.create_superuser('admin', 'amin@admin.gmail.com', 'admin')
        client.login(username='admin', password='admin')
        response = client.patch(f'/api/authapp/{person.id}/', {'first_name': 'Alexandr', 'last_name': 'Pushkin'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        person = Person.objects.get(id=person.id)
        self.assertEqual(person.first_name, 'Alexandr')
        self.assertEqual(person.last_name, 'Pushkin')


class TestTodoViewSet(APITestCase):

    def setUp(self):
        self.admin = Person.objects.create_superuser('admin', 'amin@admin.gmail.com', 'admin')
        self.client.login(username='admin', password='admin')

    def test_todo_delete(self):
        todo = mixer.blend(Todo, is_active=True)
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        response = self.client.delete(f'/api/todo/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get('/api/todo/')
        self.assertEqual(len(response.data), 0)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.is_active, False)

