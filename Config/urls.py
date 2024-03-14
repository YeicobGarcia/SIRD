














from django.contrib import admin
from Core.login.views import *
from django.urls import path, include

urlpatterns = [
    path('', LoginFormView.as_view(), name = 'Login'),
    path('admin/', admin.site.urls), 
    path('login/', include('Core.login.urls')),
    path('app/', include('Core.app.urls')),
    path('Tamu/', include('Core.Tamu.urls')),
    path('Secadores/', include('Core.Secadores.urls')),
    path('Mezcladores/', include('Core.Mezcladores.urls')),
    path('Laboratorio/', include('Core.Laboratorio.urls')),
]