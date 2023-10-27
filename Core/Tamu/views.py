
from datetime import datetime, timedelta
from django.core import serializers
from typing import Any
from django.views.generic import TemplateView
from django.views import View
from django.http import JsonResponse
from Core.Tamu.models import *

class Tamu(TemplateView):

    template_name = 'app/Tamu.html'

class Tables(TemplateView):

    template_name = 'app/tables.html'

class RegistrosTamu(TemplateView):

    template_name = 'app/registrosTamu.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        context['registros'] = TamuModel.objects.select_related('areaId', 'lineaId', 'seccionId', 'skuID').all()
        return context
    
class DateFilter(View):

    def post(self, request, *args, **kwargs):
        start_date = request.POST.get('startDateFormatted')
        end_date = request.POST.get('endDateFormatted')

        if(start_date):
            # Convertir las cadenas a objetos de fecha y tiempo
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(days=1, seconds=-1)
            registros_filtrados = TamuModel.objects.filter(fecha_registro__range=[start_date, end_date])
            data = {'message': "success", 'registros_filtrados': []}

            """serialized_data = serializers.serialize('json', registros_filtrados)
            data['registros_filtrados'] = serialized_data"""
            for registro in registros_filtrados:
                data['registros_filtrados'].append({
                    'id': registro.id,
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
        else:
            registros_filtrados = TamuModel.objects.select_related('areaId', 'lineaId', 'seccionId', 'skuID').all()
            data = {'message': "success", 'registros_filtrados': []}

            for registro in registros_filtrados:
                data['registros_filtrados'].append({
                    'id': registro.id,
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
        print("Aqui toda la data", data)

        return JsonResponse(data)

def Linea(request, area_id):
    linea = LineaModel.objects.filter(areaId=area_id).values()

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

    def post(self, request, *args, **kwargs):
        areaId = request.POST.get('idArea')
        lineaId = request.POST.get('lineaId')
        seccionId = request.POST.get('seccionId')
        skuId = request.POST.get('skuId')
        pesObtenido = request.POST.get('peso_obtenido')
        pesObjetivo = request.POST.get('peso_obtenido')
        humedadObtenida = request.POST.get('humedad_obtenida')
        humedadObjetiva = request.POST.get('humedad_objetiva')
        temperaturaObtenida = request.POST.get('temperatura_obtenida')
        temperaturaObjetiva = request.POST.get('temperatura_objetiva')
        
        try:

            area = AreaModel.objects.get(id=areaId)
            linea = LineaModel.objects.get(id=lineaId)
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
                temperatura_objetiva = temperaturaObjetiva 
            )
            tamu.save()
            return JsonResponse({'success': True})
            
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'error': str(e)})