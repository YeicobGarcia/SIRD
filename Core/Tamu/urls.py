from django.urls import path
from Core.Tamu.views import *
from . import views

urlpatterns = [
    path('', Tamu.as_view(), name='Tamu'),
    path('index/', Index.as_view(), name='Index'),
    path('Linea/<int:area_id>', views.Linea, name='Linea'),
    path('Seccion/<int:area_id>', views.Seccion, name='Seccion'),
    path('SKU/<int:area_id>', views.SKU, name='SKU'),
    path('SaveTamu/', SaveTamu.as_view(), name='SaveTamu')
]