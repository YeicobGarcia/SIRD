from django.contrib.auth import logout
from datetime import datetime, timedelta
from channels.generic.websocket import AsyncWebsocketConsumer

from Config.settings import SESSION_TIMEOUT_SECONDS


class InactivityConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.last_activity = datetime.now()

    async def receive(self, text_data):
        self.last_activity = datetime.now()

    async def disconnect(self, close_code):
        # Si el usuario está autenticado y ha superado el tiempo de inactividad, cerrar la sesión
        if self.scope['user'].is_authenticated:
            idle_duration = datetime.now() - self.last_activity
            if idle_duration.total_seconds() > SESSION_TIMEOUT_SECONDS:
                del self.scope['session']['last_activity']
                logout(self.scope)