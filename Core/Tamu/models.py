from django.db import models
from django.contrib.auth.models import User

class AreaModel(models.Model):
    nombre = models.CharField(max_length=50, null=True)

class SKUModel(models.Model):
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)
    codigoSKU = models.CharField(max_length=30, unique=True, null=True)
    descripcion = models.CharField(max_length=100, null=True)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2,  null=True)
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=2,  null=True)
    fecha_registro = models.DateTimeField(auto_now=True)
    
class LineaSeccion(models.Model):
    nombre = models.CharField(max_length=5, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE, null=True, blank=True)

    
    
class Linea(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE, null=True, blank=True)

    
class TamuModel(models.Model):
    quien_registra = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE, null=True)
    skuID = models.ForeignKey(SKUModel, on_delete=models.CASCADE, null=True)
    lineaId = models.ForeignKey(Linea, on_delete=models.CASCADE, null=True)
    seccionId = models.ForeignKey(LineaSeccion, on_delete=models.CASCADE, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    peso_obtenido = models.CharField(max_length=6, null=True, blank=True, default=0)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    humedad_obtenida = models.CharField(max_length=6, null=True, blank=True, default=0)
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    temperatura_obtenida = models.CharField(max_length=6, null=True, blank=True, default=0)
    fecha_registro = models.DateTimeField(auto_now=True)

    