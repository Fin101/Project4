from django.urls import path, include
from .views import UserProfileDetailView

urlpatterns = [
  path('profile', UserProfileDetailView.as_view())
  # path('locations', )
]