# Travel Log App
### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

![](images/travellog.png)

## Overview
The concept behind travel log app allows users to register, creating their own profile, where they can check off and track all of their previous travel destinations. This is a full-stack application built using the Django REST framework with a PostgreSQL database and a React front-end.

I'm continueing to work on the travel log app to resolve the remaining issues I've had with the user's profile and look forward to showcasing the finished product!

## Brief

* Choose to work solo or in a team
* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. 
* **Be deployed online** so it's publicly accessible.


## Technologies used
- HTML
- SCSS
- Python
- Django
- PostgreSQL
- JavaScript (ES6)
- React.js
- React Map GL (Mapbox)
- FileStack React
- React Toastify
- Webpack
- Dotenv
- Heroku
- Git and GitHub
- Trello
- Bulma

## Approach

### Back-end

### Models

### JWT_AUTH

As part of Django’s default authentication, a default user is already available for use. However, this default model has attributes which accepts only a small number of fields and only one of which is required as true. For this reason, we decided to extend the original model: 

```js
class User(AbstractUser):

    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
```

This customised model has three fields; email, first name, and last name. Email is already provided by Django’s default model. I  specified unique as also being **true**, disabling users to register with the same username and prompting the error message shown.

### Serializer

```js
class ValidateSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation',)


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'previous_locations')

        extra_kwargs = {
          'first_name': {'required': False},
          'last_name': {'required': False},
          'previous_locations': {'required': False}
        }

class PopulatedUserSerializer(serializers.ModelSerializer):

    previous_locations = PreviousLocationSerializer(many=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'previous_locations')
```