from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, Todo
from authapp.serializers import PersonModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = PersonModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    user_creator = PersonModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'
