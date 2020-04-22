from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
User = get_user_model()
from django.conf import settings
from django.shortcuts import render
import jwt
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework.generics import RetrieveDestroyAPIView, ListCreateAPIView
from .serializers import ValidateSerializer, UserSerializer, PopulatedUserSerializer
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED


class RegisterView(APIView):

    def post(self, request):
        serializer = ValidateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)

    #     request.data['user'] = request.user.id
    #     user_profile = UserProfileSerializer(data=request.data)
    #       if user_profile.is_valid():
    #           user_profile.save()
    #   return Response(user_profile.data, status=HTTP_201_CREATED)

    # return Response(user_profile.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')

        user = self.get_user(username)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})


class ProfileView(APIView):

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data)
    
    # def post(self, request, pk):
    # if request.method == 'POST':
    #   location = PreviousLocations.objects.get(pk=pk)
    #   user = request.user
    #   user.previous_locations.add(location)

    #   return Response(PreviousLocations.data, status=HTTP_201_CREATED)

    # return Response(location.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)