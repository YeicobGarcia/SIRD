from django.urls import path
from Core.Laboratorio.views import *
from . import views


urlpatterns = [
    path('', NewAnalisis.as_view(), name='NewAnalisis'),
]