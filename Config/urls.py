"""gentella URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
""" 
from django.urls import re_path as url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    # app/ -> Genetelella UI and resources
    url(r'^app/', include('app.urls')),
    url(r'^', include('app.urls')),

]"""
from django.contrib import admin
from Core.app.views import *
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), 

    path('', index.as_view(), name = 'index'),
    path('Tamu/', include('Core.Tamu.urls')),
    path('Secadores/', include('Core.Secadores.urls')),
    path('Mezcladores/', include('Core.Mezcladores.urls')),
]