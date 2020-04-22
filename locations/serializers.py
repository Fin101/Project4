from rest_framework import serializers
from .models import PreviousLocation
from django.contrib.auth import get_user_model

User = get_user_model()

class PreviousLocationSerializer(serializers.ModelSerializer):

  class Meta:
    model = PreviousLocation
    fields = ('country', 'country_code', 'longitude', 'latitude', 'visitors')

    extra_kwargs = {
      'visitors': {'required':False}
    }