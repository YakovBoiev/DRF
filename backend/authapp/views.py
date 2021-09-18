from rest_framework.viewsets import ModelViewSet
from .models import Person
from .serializers import PersonModelSerializer


class PersonModelViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonModelSerializer


