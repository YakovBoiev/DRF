from .models import Person
from .serializers import PersonModelSerializer, PersonModelSerializerV1
from rest_framework import mixins, viewsets
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


class PersonModelViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin, mixins.CreateModelMixin):
    queryset = Person.objects.all()
    # serializer_class = PersonModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == 'v1':
            return PersonModelSerializerV1
        return PersonModelSerializer



