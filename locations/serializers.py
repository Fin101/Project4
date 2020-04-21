from rest_framework import serializers
from .models import UserProfile, PreviousLocations
from django.contrib.auth import get_user_model

User = get_user_model()

class PreviousLocationsSerializer(serializers.ModelSerializer):

  class Meta:
    model = PreviousLocations
    fields = ('country', 'country_code', 'longitude', 'latitude')

class UserProfileSerializer(serializers.ModelSerializer):

  class Meta:
    model = UserProfile
    fields = ('user', 'previous_locations')

class PopulateUserProfileSerializer(UserProfileSerializer):

  previous_locations = PreviousLocationsSerializer(many=True)

  class Meta:
    model = UserProfile
    fields = ('user', 'previous_locations')