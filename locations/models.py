from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class PreviousLocation(models.Model):
  country = models.CharField(max_length=50)
  country_code = models.CharField(max_length=3)
  longitude = models.FloatField()
  latitude = models.FloatField()
  visitors = models.ManyToManyField(
    User,
    related_name='previous_locations',
    blank=True
  )

  def __str__(self):
    return f'{self.country}'
