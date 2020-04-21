from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PreviousLocations(models.Model):
  country = models.CharField(max_length=50)
  country_code = models.CharField(max_length=3)
  longitude = models.FloatField()
  latitude = models.FloatField()

class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  # user = models.ForeignKey(User, related_name='', on_delete=models.CASCADE)
  previous_locations = models.ManyToManyField(PreviousLocations, related_name='user_profile', blank=True)