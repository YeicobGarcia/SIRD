from typing import Any
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest
from django.http.response import HttpResponse as HttpResponse
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView

class index(TemplateView):

    template_name = 'app/home.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)