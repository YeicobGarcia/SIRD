from django.views import View
from Core.Viruta.models import *
from datetime import datetime
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
# Tablero General.

class Dashboard_Viruta(TemplateView, View):

    template_name = 'app/DashBoard_Viruta.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        today = datetime.now().date()
        # Ultimo registro existente en Viruta
        last_record = Viruta.objects.filter(t_stamp__date=today).order_by('-t_stamp').first()
        context['last_record'] = last_record
        return context
    
    @staticmethod
    def Estadistica_Viruta(request):
        start_date = request.GET.get('fecha_actual')
        end_date = request.GET.get('fecha_actual_final')
        #current_day = datetime.now().date()
        print(start_date)
        print(end_date)
        records = Viruta.objects.filter(t_stamp__range = [start_date, end_date])
        print("aca al menos se hizo el filtro")
        if(len(records)>0):
            #field_format = [{'t_stamp': record.t_stamp.strftime('%H:%M:%S')} for record in records]
            data = {'message': "Success_Chart", 'RegXday': list(records.values())}
            print("aca el RegXday")
        else:
            data = {'message': "Sin Registros", 'RegXday': list(records.values())}
            print("no se esta devolviendo nada")
        return JsonResponse(data)

class RegistrosViruta(TemplateView, View):

    template_name = 'app/RegistroViruta.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        today = datetime.now().date()
        registros = Viruta.objects.filter(t_stamp__date=today)
        context['registros'] = registros
        return context
    
    def post(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        # Obtener las fechas del request
        start_date = request.POST.get('initdate')
        end_date = request.POST.get('endate')
        print('start_date:',start_date)
        print('end_date:',end_date)
        if start_date and end_date:
            registros = self.get_queryset(start_date, end_date)
            context['registros'] = registros
        return render(request, self.template_name, context)

    def get_queryset(self, start_date, end_date):

        queryset = Viruta.objects.filter(t_stamp__range=[start_date, end_date])
        return queryset