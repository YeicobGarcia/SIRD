from datetime import datetime
from typing import Any
from django.views import View
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import UserLab, Analisis
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.urls import reverse_lazy
from django.contrib.auth.models import Group
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
# Create your views here.

class NewAnalisis(LoginRequiredMixin, UserPassesTestMixin, TemplateView):
    template_name = 'app/ingresoLab.html'
    login_url = reverse_lazy('login')

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def test_func(self):
        user = self.request.user
        return user.groups.filter(name__in=['Us_Laboratorio', 'Us_Admin']).exists()

    def handle_no_permission(self):
        return redirect('/')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        today = datetime.now().date()

        context['resultados'] = Analisis.objects.select_related('us_recibe')\
        .filter(fecha_inicio__date=today)

        return context
    
    def NewOrder(request):
        selectUser = request.GET.get('selectUser')
        alcalinidad = request.GET.get('alcalinidad')
        cloruro = request.GET.get('cloruro')
        humedad = request.GET.get('humedad')
        activo = request.GET.get('activo')
        otros_analisis = request.GET.get('otros')
        solicitados = request.GET.get('solicitados')
        
        userLog = request.user

        try:
            # Obtener el usuario seleccionado
            userOp = get_object_or_404(UserLab, id=selectUser)
            # Crear una nueva instancia de Analisis y establecer la relación con los usuarios
            newOrder = Analisis.objects.create(
                us_recibe=userLog,
                us_entrega=userOp,
                alcalinidad=alcalinidad,
                cloruro=cloruro,
                humedad=humedad,
                activo=activo,
                otros_analisis=otros_analisis,
                solicitud_total=solicitados
            )
            return JsonResponse({'message' : "Success"})
        except Exception as e:
            print(e)
            return JsonResponse({'message' : False, 'error': str(e)})
    
    def CR_User(request):
        firstName = request.GET.get('firstName')
        lastName = request.GET.get('lastName')
        print(firstName)
        print(lastName)

        try:
            addUser = UserLab(nombre = firstName, apellido = lastName)
            addUser.save()
            return JsonResponse({'message': "Success"})
        except Exception as e:
            print(e)
            return JsonResponse({'message': False, 'error': str(e)})

    def getUsers(request):
        users = UserLab.objects.values()

        if(len(users)>0):
            data = {'message': "Success", 'User': list(users)}
        else:
            data = {'message': "No encontrado"}
            
        return JsonResponse(data)


class ResultadoAnalisis(LoginRequiredMixin, UserPassesTestMixin, TemplateView):
    template_name = "app/resultadoAnalisis.html"

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def test_func(self):
        user = self.request.user
        return user.groups.filter(name__in=['Us_Operadores', 'Us_Admin']).exists()

    def handle_no_permission(self):
        return redirect('/')

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        today = datetime.now().date()

        context['resultados'] = Analisis.objects.select_related('us_recibe')\
        .filter(fecha_inicio__date=today)

        return context
    
    def getAnalisis(request):

        idOrden = request.GET.get('idOrden')

        try:
            getAnalisis = Analisis.objects.filter(id = idOrden).values()
            return JsonResponse({'message': "Success", 'data': list(getAnalisis)})

        except Exception as e:

            print(e)
            return JsonResponse({'message': False, 'error': str(e)})
        
    def cancelAnalisis(request):
        idOrden = request.GET.get('idOrden')
        if idOrden is None:
                raise ValueError('El ID del análisis no se proporcionó en los datos.')

        # Obtener el objeto Analisis 
        analisis = get_object_or_404(Analisis, id=idOrden)
        try:
            # Cambiar estado del objeto Analisis
            setattr(analisis, 'estado', 'cancelado')
            analisis.save()
            return JsonResponse({'message': "Success"})
        except Exception as e:
            print("Tipo de Error:", e)
            return JsonResponse({'message': False, 'error': str(e)})

    @require_POST
    def saveResultados(request):

        try:
            data = json.loads(request.body)
            print('p1',data)
            # Obtener el ID del análisis desde los datos
            id_analisis = data.get('id')
            if id_analisis is None:
                raise ValueError('El ID del análisis no se proporcionó en los datos.')

            # Obtener el objeto Analisis o crear uno nuevo si no existe
            analisis = get_object_or_404(Analisis, id=id_analisis)
            print('p2',analisis)
            # Validar campo por campo desde Alcalinidad hasta Activo
            campos_a_validar = ['alcalinidad', 'cloruro', 'humedad', 'activo']
            for campo in campos_a_validar:
                valor_campo = data.get(campo)
                print('p3',valor_campo)
                if valor_campo is not None:
                    setattr(analisis, campo, valor_campo)
                    print('p4',valor_campo,campo)

            # Obtener campos que no son Alcalinidad, Cloruro, Humedad ni Activo
            otros_campos = {key: value for key, value in data.items() if key not in campos_a_validar}
            print('p5',otros_campos)
            
            # Si hay campos adicionales fuera de campos_a_validar, concatenar en otros_analisis
            if len(otros_campos) > 1:
                analisis.otros_analisis = ', '.join(f'{key}: {value}' for key, value in otros_campos.items())
            print('p6',analisis.otros_analisis)
            # Guardar el objeto Analisis
            setattr(analisis, 'estado', 'finalizado')
            analisis.save()

            return JsonResponse({'message': "Success"})
        except Exception as e:
            print(e)
            return JsonResponse({'message': False, 'error': str(e)})