from django.urls import path
from Core.Tamu.views import *

urlpatterns = [
    path('', Tamu.as_view(), name='Tamu')
]