from django.views.generic import RedirectView
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.contrib.auth import logout


# Create your views here.
class LoginFormView(LoginView):
    template_name = 'app/login.html'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('app:index')
        return super().dispatch(request, *args, **kwargs)

    """def form_valid(self, form):
        login(self.request, user=form.get_user())
        return super(LoginFormView, self).form_valid(form)"""

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Iniciar sesión'
        return context
    

class LogoutRedirectView(RedirectView):
    pattern_name = 'login'
    
    def dispatch(self, request, *args, **kwargs):
        logout(request)
        return super().dispatch(request, *args, **kwargs)