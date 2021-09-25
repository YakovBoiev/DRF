from .models import Person
from .serializers import PersonModelSerializer
from rest_framework import mixins, viewsets
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


class PersonModelViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin):
    queryset = Person.objects.all()
    serializer_class = PersonModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


