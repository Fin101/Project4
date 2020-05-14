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

### Locations

I then had to create a locations model using data extracted from a country REST API. In order to display the user's previous travel destinations on an interactive map, I need the longitude and latitude to feature in the model.

```js
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
```

### Serializer

Now that the models are created, I needed to create serializers to convert them into JSON formatting. This was necessary in order for Django to communicate with the PostgreSQL database. The purpose of the serializers is simply converting data. In the database, data is stored differently to how it needs to be rendered for the API endpoints and is necessary to be able to display data that is clear to those who use the API. The serializers also validate before it is stored into the database, ensuring all required fields are submitted appropriately. 

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