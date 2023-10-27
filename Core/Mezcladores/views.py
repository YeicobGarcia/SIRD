from django.shortcuts import render
from django.views.generic import TemplateView

class Ordenes(TemplateView):

    template_name = 'app/Ordenes.html'
