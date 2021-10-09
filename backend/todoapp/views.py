from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer
from .filters import ProjectFilter, TodoFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, BasePermission


class ProjectLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    # permission_classes = [DjangoModelPermissions]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    # pagination_class = ProjectLimitOffsetPaginator


class TodoModelViewSet(ModelViewSet):
    # permission_classes = [DjangoModelPermissions]
    queryset = Todo.objects.filter(is_active=True)
    serializer_class = TodoModelSerializer
    filterset_class = TodoFilter
    # pagination_class = TodoLimitOffsetPaginator

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

