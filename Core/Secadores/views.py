
from datetime import datetime
from django.views.generic import TemplateView
from Core.Secadores.models import *
from django.http import JsonResponse
from django.views import View

class DashBoardL1(TemplateView, View):

    template_name = 'app/DashBoardL1.html'

    @staticmethod
    def EstadisticaL1(request):
        start_date = request.GET.get('fecha_actual')
        end_date = request.GET.get('fecha_actual_final')
        #current_day = datetime.now().date()
        print(start_date)
        print(end_date)
        records = Linea1.objects.filter(t_stamp__range = [start_date, end_date])
        print("aca al menos se hizo el filtro", records)
        if(len(records)>0):
            #field_format = [{'t_stamp': record.t_stamp.strftime('%H:%M:%S')} for record in records]
            data = {'message': "Success", 'RegXday': list(records.values())}
            print("aca se formateo en teroia")
        else:
            data = {'message': "None"}
            print("no se esta devolviendo nada")
        return JsonResponse(data)

class RegistroSecador1(TemplateView):

    template_name = 'app/RegistroSecador1.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        #today = datetime.now().date()

        context['registros'] = Linea1.objects.all()

        return context
    
class RegistroSecador6(TemplateView):

    template_name = 'app/RegistroSecador6.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        #today = datetime.now().date()

        context['registros'] = Linea6.objects.all()

        return context
    
class RegistroSecador7(TemplateView):

    template_name = 'app/RegistroSecador7.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        #today = datetime.now().date()

        context['registros'] = Linea7.objects.all()

        return context


    