from django.urls import path
from Core.Laboratorio.views import *
from . import views


urlpatterns = [
    path('', NewAnalisis.as_view(), name='NewAnalisis'),
    path('newUsers/', NewAnalisis.CR_User, name='newUsers'),
    path('getUsers/', NewAnalisis.getUsers, name='getUsers'), 
]