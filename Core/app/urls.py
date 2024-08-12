from django.urls import path
from Core.app.views import *
from . import views

app_name = 'app'

urlpatterns = [
    # The home page
    path('', index.as_view(), name='index'),
]