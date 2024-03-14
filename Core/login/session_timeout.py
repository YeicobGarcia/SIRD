from datetime import datetime
from django.contrib.auth import logout
from django.shortcuts import redirect

from Config.settings import SESSION_TIMEOUT_SECONDS

class SessionTimeoutMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Verificar si el usuario está autenticado
        if request.user.is_authenticated:
            # Obtener el tiempo de la última actividad
            last_activity = request.session.get('last_activity')

            # Verificar si last_activity existe y es válido
            if last_activity:
                last_activity = datetime.strptime(last_activity, '%Y-%m-%d %H:%M:%S.%f')

                # Calcular el tiempo transcurrido desde la última actividad
                idle_duration = datetime.now() - last_activity

                # Verificar si se ha excedido el tiempo de espera
                if idle_duration.total_seconds() > SESSION_TIMEOUT_SECONDS:
                    # Cerrar sesión y eliminar last_activity de la sesión
                    del request.session['last_activity']
                    logout(request)

                    # Si se realizó una solicitud GET, redirigir a la página de inicio de sesión
                    if request.method == 'GET':
                        return redirect('login')

            # Actualizar last_activity a la hora actual
            request.session['last_activity'] = str(datetime.now())

        return response