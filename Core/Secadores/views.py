from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.decorators import method_decorator
from datetime import datetime
from django.views.generic import TemplateView
from Core.Secadores.models import *
from django.http import JsonResponse
from django.views import View

class DashBoardL1(TemplateView, View):

    template_name = 'app/DashBoardL1.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
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
            data = {'message': "SuccessChart", 'RegXday': list(records.values())}
            print("aca se formateo en teroia")
        else:
            data = {'message': "Sin Registros", 'RegXday': list(records.values())}
            print("no se esta devolviendo nada")
        return JsonResponse(data)
    
class EstadisticaL1(TemplateView, View):

    template_name = 'app/EstadisticaL1.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
class DashBoardL6(TemplateView, View):

    template_name = 'app/DashBoardL6.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    @staticmethod
    def EstadisticaL6(request):
        start_date = request.GET.get('fecha_actual')
        end_date = request.GET.get('fecha_actual_final')
        #current_day = datetime.now().date()
        print(start_date)
        print(end_date)
        records = Linea6.objects.filter(t_stamp__range = [start_date, end_date])
        print("aca al menos se hizo el filtro", records)
        if(len(records)>0):
            #field_format = [{'t_stamp': record.t_stamp.strftime('%H:%M:%S')} for record in records]
            data = {'message': "SuccessChart", 'RegXday': list(records.values())}
            print("aca se formateo en teroia")
        else:
            data = {'message': "Sin Registros", 'RegXday': list(records.values())}
            print("no se esta devolviendo nada")
        return JsonResponse(data)
    
class EstadisticaL6(TemplateView, View):

    template_name = 'app/EstadisticaL6.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

class DashBoardL7(TemplateView, View):

    template_name = 'app/DashBoardL7.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    @staticmethod
    def EstadisticaL7(request):
        start_date = request.GET.get('fecha_actual')
        end_date = request.GET.get('fecha_actual_final')
        #current_day = datetime.now().date()
        print(start_date)
        print(end_date)
        records = Linea7.objects.filter(t_stamp__range = [start_date, end_date])
        print("aca al menos se hizo el filtro", records)
        if(len(records)>0):
            #field_format = [{'t_stamp': record.t_stamp.strftime('%H:%M:%S')} for record in records]
            data = {'message': "SuccessChart", 'RegXday': list(records.values())}
            print("aca se formateo en teroia")
        else:
            data = {'message': "Sin Registros", 'RegXday': list(records.values())}
            print("no se esta devolviendo nada")
        return JsonResponse(data)
    
class EstadisticaL7(TemplateView, View):

    template_name = 'app/EstadisticaL7.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
class RegistroSecador1(TemplateView):

    template_name = 'app/RegistroSecador1.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        today = datetime.now().date()

        context['registros'] = Linea1.objects.filter(t_stamp__date=today)
        return context
    
    def post(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        # Obtener las fechas del request
        start_date = request.POST.get('initdate')
        end_date = request.POST.get('endate')
        print('start_date:',start_date)
        print('end_date:',end_date)
        if start_date and end_date:
            context['registros'] = self.get_queryset(start_date, end_date)
        return render(request, self.template_name, context)

    def get_queryset(self, start_date, end_date):

        queryset = Linea1.objects.filter(t_stamp__range=[start_date, end_date])
        print('aca el query set:',queryset)
        return queryset
    
    
"""class RegistroSecador1(TemplateView):

    template_name = 'app/RegistroSecador1.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        today = datetime.now().date()

        context['registros'] = Linea1.objects.filter(t_stamp__date=today)

        return context
    
    @staticmethod
    def RegistroSecadorL1(request):
        start_date = request.GET.get('fecha_actual')
        end_date = request.GET.get('fecha_actual_final')
        #current_day = datetime.now().date()
        print(start_date)
        print(end_date)
        records = Linea1.objects.filter(t_stamp__range = [start_date, end_date])
        print("aca al menos se hizo el filtro", records)
        if(len(records)>0):
            #field_format = [{'t_stamp': record.t_stamp.strftime('%H:%M:%S')} for record in records]
            data = {'message': "SuccessReg", 'RegXday': list(records.values())}
            print("aca se formateo en teroia")
        else:
            data = {'message': "SuccessReg", 'RegXday': list(records.values())}
            print("no se esta devolviendo nada")
        return JsonResponse(data)"""
    
class RegistroSecador6(TemplateView):

    template_name = 'app/RegistroSecador6.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        today = datetime.now().date()

        context['registros'] = Linea6.objects.filter(t_stamp__date=today)

        return context
    
    def post(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        # Obtener las fechas del request
        start_date = request.POST.get('initdate')
        end_date = request.POST.get('endate')
        print('start_date:',start_date)
        print('end_date:',end_date)
        if start_date and end_date:
            context['registros'] = self.get_queryset(start_date, end_date)
        return render(request, self.template_name, context)

    def get_queryset(self, start_date, end_date):

        queryset = Linea6.objects.filter(t_stamp__range=[start_date, end_date])
        print('aca el query set:',queryset)
        return queryset
    
class RegistroSecador7(TemplateView):

    template_name = 'app/RegistroSecador7.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        today = datetime.now().date()

        context['registros'] = Linea7.objects.filter(t_stamp__date=today)

        return context
    
    def post(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        # Obtener las fechas del request
        start_date = request.POST.get('initdate')
        end_date = request.POST.get('endate')
        print('start_date:',start_date)
        print('end_date:',end_date)
        if start_date and end_date:
            context['registros'] = self.get_queryset(start_date, end_date)
        return render(request, self.template_name, context)

    def get_queryset(self, start_date, end_date):

        queryset = Linea7.objects.filter(t_stamp__range=[start_date, end_date])
        print('aca el query set:',queryset)
        return queryset


    