from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

  # user = models.OneToOneField(User, on_delete=models.CASCADE)
  # # user = models.ForeignKey(User, related_name='', on_delete=models.CASCADE)
  # previous_locations = models.ManyToManyField(PreviousLocations, related_name='user_profile', blank=True)