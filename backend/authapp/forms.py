from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Person


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = Person
        fields = '__all__'


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = Person
        fields = '__all__'

