from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer
from .filters import ProjectFilter, TodoFilter
from  rest_framework.pagination import LimitOffsetPagination


class ProjectLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 2


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPaginator


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_class = TodoFilter

    def get_queryset(self):
        return Todo.objects.filter(is_active=True)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

