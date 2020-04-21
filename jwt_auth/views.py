from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User
from django.conf import settings
import jwt
from .serializers import UserSerializer
from rest_framework.generics import RetrieveDestroyAPIView, ListCreateAPIView

class RegisterView(APIView):

    serializer_class = UserSerializer

    queryset = User.objects.all()

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer, 'HELLOOOOOOOOOOOO')
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