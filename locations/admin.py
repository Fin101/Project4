from django.contrib import admin
from .models import UserProfile, PreviousLocations

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(PreviousLocations)