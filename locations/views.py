from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated

from .models import PreviousLocation
from .serializers import  PreviousLocationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class PreviousLocationListView(APIView):

  permission_classes = (IsAuthenticated, )

  def post(self, request):

    request.data['visitors'] = (request.user.id, )
    previous_locations = PreviousLocationSerializer(data=request.data)
    if previous_locations.is_valid():
      previous_locations.save()
      return Response(previous_locations.data, HTTP_201_CREATED)
    return Response(previous_locations.errors, HTTP_422_UNPROCESSABLE_ENTITY)