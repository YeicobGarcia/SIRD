from Core.Viruta.views import *
from django.urls import path


urlpatterns = [
    path('', Dashboard_Viruta.as_view(), name='Dashboard_Viruta'),
    path('Data_Estadistica/', Dashboard_Viruta.Data_Estadistica, name='Tablero_Viruta'),
    path('RegistrosViruta/', RegistrosViruta.as_view(), name='RegistrosViruta'),
    path('EstadisticaViruta', EstadisticaViruta.as_view(), name='EstadisticaViruta'),
]