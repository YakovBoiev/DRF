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


class TestTodoViewSet(APITestCase):

    def setUp(self):
        self.admin = Person.objects.create_superuser('admin', 'amin@admin.gmail.com', 'admin')
        self.client.login(username='admin', password='admin')

    def test_todo_delete(self):
        todo = mixer.blend(Todo)
        response = self.client.get('/api/todo/')
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)




