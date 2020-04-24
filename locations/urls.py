from django.urls import path, include
from .views import PreviousLocationListView

urlpatterns = [
  path('newlocation', PreviousLocationListView.as_view())
]