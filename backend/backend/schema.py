import graphene
from graphene_django import DjangoObjectType
from authapp.views import Person
from todoapp.views import Todo, Project


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class PersonType(DjangoObjectType):
    class Meta:
        model = Person
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_user = graphene.List(PersonType)
    all_project = graphene.List(ProjectType)
    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_user(root, info):
        return Person.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_todo_by_id(self, info, id):
        try:
            return Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)

