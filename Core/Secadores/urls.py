from django.urls import path
from Core.Secadores.views import *
from . import views

urlpatterns = [
    path('', SecadorPrincipal.as_view(), name='SecadorPrincipal'),
]