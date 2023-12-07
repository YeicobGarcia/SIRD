from django.urls import path
from Core.Secadores.views import *
from . import views

urlpatterns = [
    path('', DashBoardL1.as_view(), name='DashBoardL1'),
    path('EstadisticaL1/', DashBoardL1.EstadisticaL1, name='EstadisticaL1'),
    path('RegistroSecador1/', RegistroSecador1.as_view(), name='RegistroSecador1'),
    path('RegistroSecador6/', RegistroSecador6.as_view(), name='RegistroSecador6'),
    path('RegistroSecador7/', RegistroSecador7.as_view(), name='RegistroSecador7'),
    #
]