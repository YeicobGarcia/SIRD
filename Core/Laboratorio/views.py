from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.



class NewAnalisis(TemplateView):
    template_name = 'app/ingresoLab.html'
