from django.urls import path

from login.consumers import InactivityConsumer

websocket_urlpatterns = [
    path('ws/login/', InactivityConsumer.as_asgi()),
]