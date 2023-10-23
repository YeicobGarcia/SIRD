
from django.views.generic import TemplateView
from django.views import View
from django.http import JsonResponse
from Core.Tamu.models import *

class Tamu(TemplateView):

    template_name = 'app/Tamu.html'

class Index(TemplateView):

    template_name = 'app/index.html'
"""def Area(request, area_id):

    area = list(AreaModel.objects.values())

    if(len(area)>0):
        data = {'message': "Success", 'area': area}
    else:
        data = {'message': "No encontrado"}

    return JsonResponse(data)"""

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