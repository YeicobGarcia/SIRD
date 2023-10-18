
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

    if(len(seccion)>0):
        data = {'message': "Success", 'seccion': list(seccion)}
    else:
        data = {'message': "No encontrado"}

    return JsonResponse(data)

def SKU(request, area_id):
    sku = SKUModel.objects.filter(areaId=area_id).values()

    if(len(sku)>0):
        data = {'message': "Success", 'sku': list(sku)}
    else:
        data = {'message': "No encontrado"}

    return JsonResponse(data)