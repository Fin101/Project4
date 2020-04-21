from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated

from .models import UserProfile, PreviousLocations
from .serializers import UserProfileSerializer, PreviousLocationsSerializer, PopulateUserProfileSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfileDetailView(APIView):

  permission_classes = (IsAuthenticated, )

  def post(self, request):
    request.data['user'] = request.user.id
    user_profile = UserProfileSerializer(data=request.data)
    if user_profile.is_valid():
      user_profile.save()

      return Response(user_profile.data, status=HTTP_201_CREATED)

    return Response(user_profile.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

  def get(self, request):
    user_profile = UserProfile.objects.get(pk=request.user.id)
    # user_profile = UserProfile.objects.get(pk=4)
    serialized_user = PopulateUserProfileSerializer(user_profile)
    # print('HELLO WORLD')
    print(request.user.id, 'HERE I AM FUCKERRSS!!!')
    print(UserProfile.objects.all())
    return Response(serialized_user.data)

  # def location(self, request, pk):
  #   if request.method == 'POST':
  #     location = PreviousLocations.objects.get(pk=pk)
  #     user = request.user
  #     user.previous_locations.add(location)

  #     return Response(PreviousLocations.data, status=HTTP_201_CREATED)

  #   return Response(location.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)