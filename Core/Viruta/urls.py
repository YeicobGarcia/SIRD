from Core.Viruta.views import *
from django.urls import path


urlpatterns = [
    path('', Dashboard_Viruta.as_view(), name='Dashboard_Viruta'),
    path('Estadistica_Viruta/', Dashboard_Viruta.Estadistica_Viruta, name='Estadistica_Viruta'),
    path('RegistrosViruta/', RegistrosViruta.as_view(), name='RegistrosViruta'),
]