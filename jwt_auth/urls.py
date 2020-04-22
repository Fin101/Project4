from django.urls import path
from .views import RegisterView, LoginView, ProfileView # importing our views from JWT auth

# no id send in params to any of these routes

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('profile', ProfileView.as_view())
]