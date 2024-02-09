

from django.views.generic import TemplateView

class Home(TemplateView):

    template_name = 'app/home.html'

class index(TemplateView):

    template_name = 'app/login.html'