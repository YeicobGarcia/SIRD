from django.urls import path
from Core.Tamu.views import *
from . import views

urlpatterns = [
    path('', Tamu.as_view(), name='Tamu'),
    path('RegistrosTamu/', RegistrosTamu.as_view(), name='RegistrosTamu'),
    path('Estadistica/', Estadistica.as_view(), name='Estadistica'),
    path('Estadistica/EstadisticaFilter/', Estadistica.EstadisticaFilter, name='EstadisticaFilter'),
    path('Linea/<int:area_id>', views.Line, name='Linea'),
    path('Seccion/<int:area_id>', views.Seccion, name='Seccion'),
    path('SKU/<int:area_id>', views.SKU, name='SKU'),
    path('SaveTamu/', SaveTamu.as_view(), name='SaveTamu'),
    path('RegistrosTamu/DateFilter/', DateFilter.as_view(), name='DateFilter'),
    path('SKU/', RegistrosSKU_CRUD.as_view(), name='SKU'),
    path('SKU/GetSKU/', RegistrosSKU_CRUD.getSku, name='GetSKU'),
    path('GetSKU/', Tamu.getSku, name='GetSKU'),
    path('SKU/deleteSku/', RegistrosSKU_CRUD.deleteSku, name='deleteSku'),
]