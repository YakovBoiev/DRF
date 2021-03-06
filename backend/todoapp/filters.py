from django_filters import rest_framework as filters
from .models import Project, Todo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
    project__name = filters.CharFilter(lookup_expr='exact')
    create_date = filters.BaseRangeFilter(lookup_expr='range')

    class Meta:
        model = Todo
        fields = ['project__name', 'create_date']




