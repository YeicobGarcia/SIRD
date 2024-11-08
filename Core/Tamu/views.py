
from datetime import datetime, timedelta
from django.core import serializers
from typing import Any
from django.db.models import F
from django.views.generic import TemplateView
from django.views.generic.edit import CreateView
from django.views import View
from django.db.models import Avg
from django.http import JsonResponse
from Core.Tamu.models import *
from .forms import SKU_FORM, SKU_FORM_EDIT
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404, redirect, render

class Tamu(TemplateView):

    template_name = 'app/Tamu.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        form = SKU_FORM_EDIT()
        context['form'] = form
        return context

    def post(self, request, *args, **kwargs):
        Operacion = request.POST.get('Operacion')
        print('Aquí el btn pressed')
        if Operacion == 'edit':
            registro_id = request.POST.get('registro_id')
            print('aca el idsku', registro_id)
            if registro_id:
                sku = SKUModel.objects.get(id=registro_id)
                form = SKU_FORM_EDIT(request.POST, instance=sku)
                if form.is_valid():
                    form.save()
                    return JsonResponse({'success': True})
                else:
                    print('not form')
                    return JsonResponse({'success': False})
            else:
                return JsonResponse({'success': False})
        else:
            print('ni edit ni save', Operacion)
            return JsonResponse({'success': False})

    @staticmethod
    def getSku(request):
        try:
            id = request.GET.get('idSKU')
            registro = SKUModel.objects.filter(pk=id)
            print('la data SKU', registro)
            if(len(registro)>0):
                data = {'message': "Success", 'RegSKU': registro.values().first()}
            else:
                data = {'message': "Success", 'RegSKU': registro.values().first()}
                print("no se esta devolviendo nada")
            return JsonResponse(data)
        except SKUModel.DoesNotExist:
            return JsonResponse({'error': 'Registro no encontrado'}, status=404)

class Estadistica(TemplateView):

    template_name = 'app/EstadisticaTamu.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        today = datetime.now().date()
        # Ultimo registro existente en Viruta
        promedios = TamuModel.objects.filter(fecha_registro__date=today).aggregate(
            avg_peso=Avg('peso_obtenido'),
            avg_humedad=Avg('humedad_obtenida'),
            avg_temperatura=Avg('temperatura_obtenida')
        )

        # Agregar los promedios al contexto
        context['avg_peso'] = promedios['avg_peso']
        context['avg_humedad'] = promedios['avg_humedad']
        context['avg_temperatura'] = promedios['avg_temperatura']
        return context
    
    @staticmethod
    def EstadisticaFilter(request):
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        idLine = request.GET.get('idLine')
        idLado = request.GET.get('idLado')
        print('start_date:', start_date)
        print('end_date:', end_date)
        #today = datetime.now().date()
        if start_date and end_date:
            allDayLine = TamuModel.objects.filter(lineaId__id=idLine, seccionId__id=idLado, fecha_registro__range=[start_date, end_date]
            ).annotate(
                quien_registra_username=F('quien_registra__username')  # Agrega el nombre de usuario como un campo adicional
            ).values() # Obtiene todos los campos del modelo, incluyendo el nombre de usuario agregado
            if allDayLine.exists():
                data = {'message': "Success", 'RegXlinea': list(allDayLine)}
                #print('Si hay data:', data)
            else:
                data = {'message': "No encontrado"}
                print('No hay data:', data)
        else:
            data = {'message': "Fechas no proporcionadas"}

        return JsonResponse(data)

class RegistrosTamu(TemplateView):

    template_name = 'app/registrosTamu.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
# se sobre escribe el metodo get_context_data, con esto se agrega informacion adicional y se manda al cliente
    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        today = datetime.now().date()

        context['registros'] = TamuModel.objects.select_related('areaId', 'lineaId', 'seccionId', 'skuID')\
        .filter(fecha_registro__date=today)
        return context
    
class DateFilter(View):

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        start_date = request.POST.get('startDateFormatted')
        end_date = request.POST.get('endDateFormatted')

        def reutilizarFiltro(registros_filtrados):
            for registro in registros_filtrados:
                data['registros_filtrados'].append({
                    'id': registro.id,
                    'tamu_firstname': registro.quien_registra.first_name,
                    'tamu_lastname': registro.quien_registra.last_name,
                    'fecha_registro': registro.fecha_registro,
                    'areaId': registro.areaId.nombre,
                    'lineaId': registro.lineaId.nombre,
                    'seccionId': registro.seccionId.nombre,
                    'skuID': registro.skuID.descripcion,
                    'peso_obtenido': registro.peso_obtenido,
                    'peso_objetivo': registro.peso_objetivo,
                    'humedad_obtenida': registro.humedad_obtenida,
                    'humedad_objetiva': registro.humedad_objetiva,
                    'temperatura_obtenida': registro.temperatura_obtenida,
                    'temperatura_objetiva': registro.temperatura_objetiva,
                })

        if(start_date):
            # Convertir las cadenas a objetos de fecha y tiempo
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(days=1, seconds=-1)
            registros_filtrados = TamuModel.objects.filter(fecha_registro__range=[start_date, end_date])
            data = {'message': "success", 'registros_filtrados': []}

            """serialized_data = serializers.serialize('json', registros_filtrados)
            data['registros_filtrados'] = serialized_data"""
            
            reutilizarFiltro(registros_filtrados)
        else:
            today = datetime.now().date()
            registros_filtrados = TamuModel.objects.select_related('areaId', 'lineaId', 'seccionId', 'skuID')\
            .filter(fecha_registro__date=today)
            data = {'message': "success", 'registros_filtrados': []}

            reutilizarFiltro(registros_filtrados)

        print("Aqui toda la data", data)

        return JsonResponse(data)

def Line(request, area_id):
    linea = Linea.objects.filter(areaId=area_id).values()

    if(len(linea)>0):
        data = {'message': "Success", 'linea': list(linea)}
    else:
        data = {'message': "No encontrado"}

    return JsonResponse(data)

def Seccion(request, area_id):
    seccion = LineaSeccion.objects.filter(areaId=area_id).values()

    if(len(seccion)>1):
        data = {'message': "Success", 'seccion': list(seccion)}
    else:
        data = {'message': "No encontrado", 'seccion': list(seccion)}
        
    return JsonResponse(data)

def SKU(request, area_id):
    sku = SKUModel.objects.filter(areaId=area_id).values()

    if(len(sku)>0):
        data = {'message': "Success", 'sku': list(sku)}
    else:
        data = {'message': "No encontrado"}

    return JsonResponse(data)

class SaveTamu(View):

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        userLog = request.user
        areaId = request.POST.get('idArea')
        lineaId = request.POST.get('lineaId')
        seccionId = request.POST.get('seccionId')
        skuId = request.POST.get('skuId')
        pesObtenido = request.POST.get('peso_obtenido')
        pesObjetivo = request.POST.get('peso_objetivo')
        humedadObtenida = request.POST.get('humedad_obtenida')
        humedadObjetiva = request.POST.get('humedad_objetiva')
        temperaturaObtenida = request.POST.get('temperatura_obtenida')
        temperaturaObjetiva = request.POST.get('temperatura_objetiva')
        
        try:
            area = AreaModel.objects.get(id=areaId)
            linea = Linea.objects.get(id=lineaId)
            seccion = LineaSeccion.objects.get(id=seccionId)
            sku = SKUModel.objects.get(id=skuId)
            
            tamu = TamuModel(
                areaId = area,
                lineaId = linea,
                seccionId = seccion,
                skuID = sku,
                peso_obtenido = pesObtenido,
                peso_objetivo = pesObjetivo,
                humedad_obtenida = humedadObtenida,
                humedad_objetiva = humedadObjetiva,
                temperatura_obtenida = temperaturaObtenida,
                temperatura_objetiva = temperaturaObjetiva,
                quien_registra = userLog 
            )
            tamu.save()
            return JsonResponse({'success': True})
            
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'error': str(e)})
        
class RegistrosSKU_CRUD(TemplateView):

    template_name = 'app/crud_sku.html'

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        form = SKU_FORM()
        context['form'] = form
        context['registros'] = SKUModel.objects.all()
        return context

    def post(self, request, *args, **kwargs):
        Operacion = request.POST.get('Operacion')
        print('Aquí el btn pressed')
        if Operacion == 'save':
            form = SKU_FORM(request.POST)
            print('Aquí el btn SAVE', Operacion)
            form.save()
            return JsonResponse({'success': True})
        elif Operacion == 'edit':
            registro_id = request.POST.get('registro_id')
            print('aca el idsku', registro_id)
            if registro_id:
                sku = SKUModel.objects.get(id=registro_id)
                form = SKU_FORM(request.POST, instance=sku)
                if form.is_valid():
                    form.save()
                    return JsonResponse({'success': True})
                else:
                    print('not form')
                    return JsonResponse({'success': False})
            else:
                return JsonResponse({'success': False})
        else:
            print('ni edit ni save', Operacion)
            return JsonResponse({'success': False})

    @staticmethod
    def getSku(request):
        try:
            id = request.GET.get('idSKU')
            registro = SKUModel.objects.filter(pk=id)
            print('la data SKU', registro)
            if(len(registro)>0):
                data = {'message': "Success", 'RegSKU': registro.values().first()}
            else:
                data = {'message': "Success", 'RegSKU': registro.values().first()}
                print("no se esta devolviendo nada")
            return JsonResponse(data)
        except SKUModel.DoesNotExist:
            return JsonResponse({'error': 'Registro no encontrado'}, status=404)
        
    @staticmethod
    def deleteSku(request):
        try:
            print('Se hizo el delete')
            registro_id = request.GET.get('idSKU')
            sku = SKUModel.objects.filter(id=registro_id)
            sku.delete()
            return JsonResponse({'success': True})
        except SKUModel.DoesNotExist:
            return JsonResponse({'error': 'Registro no encontrado'}, status=404)