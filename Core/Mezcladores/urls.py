from django.urls import path
from Core.Mezcladores.views import *
from . import views

urlpatterns = [
    path('', Ordenes.as_view(), name='Ordenes'),
    path('ConsumoG/', ConsumoG.as_view(), name='ConsumoG'),
    path('ConsumoPMP/', ConsumoPMP.as_view(), name='ConsumoPMP'),
]