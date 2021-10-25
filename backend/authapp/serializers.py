from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Person


class PersonModelSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = ['username', 'first_name', 'last_name', 'email', 'id']


class PersonModelSerializerV1(ModelSerializer):
    class Meta:
        model = Person
        fields = ['username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser', 'id']
