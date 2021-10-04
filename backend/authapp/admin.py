from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Person
from .forms import CustomUserCreationForm, CustomUserChangeForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = Person

admin.site.register(Person, CustomUserAdmin)