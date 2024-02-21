from django.db import models
from django.contrib.auth.models import User


class AreaModel(models.Model):
    nombre = models.CharField(max_length=50, null=True)

    """def __str__(self):
        # Devuelve una representación legible del modelo en el admin
        texto = "{0} ({1})"
        return texto.format(self.nombre)"""

class SKUModel(models.Model):
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)
    codigoSKU = models.CharField(max_length=30, unique=True, null=True)
    descripcion = models.CharField(max_length=100, null=True)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=0, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=0,  null=True)
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=0,  null=True)
    
    """def __str__(self):
        # Devuelve una representación legible del modelo en el admin
        texto = "SKU: {0} humedad_objetiva: ({1}) peso_objetivo:({2}) temperatura_objetiva:({3})"
        return texto.format(self.descripcion, self.humedad_objetiva, self.peso_objetivo, self.temperatura_objetiva)
    """
class LineaSeccion(models.Model):
    nombre = models.CharField(max_length=5, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE, null=True, blank=True)

    """def __str__(self):
        # Devuelve una representación legible del modelo en el admin
        texto = "{0}"
        return texto.format(self.nombre)"""
    
class Linea(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE, null=True, blank=True)

    """def __str__(self):
        # Devuelve una representación legible del modelo en el admin
        texto = "{0}"
        return texto.format(self.nombre)"""

class TamuModel(models.Model):
    quien_registra = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE, null=True)
    skuID = models.ForeignKey(SKUModel, on_delete=models.CASCADE, null=True)
    lineaId = models.ForeignKey(Linea, on_delete=models.CASCADE, null=True)
    seccionId = models.ForeignKey(LineaSeccion, on_delete=models.CASCADE, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=0, null=True)
    peso_obtenido = models.IntegerField(null=True, blank=True, default=0)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=0, null=True)
    humedad_obtenida = models.IntegerField(null=True, blank=True, default=0)
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=0, null=True)
    temperatura_obtenida = models.IntegerField(null=True, default=0, blank=True)
    fecha_registro = models.DateTimeField(auto_now=True)

    """def __str__(self):
        # Devuelve una representación legible del modelo en el admin
        texto = "peso_objetivo: ({0}) peso_obtenido:({1}) humedad_objetiva:({2})  humedad_obtenida:({3}) temperatura_objetiva:({4}) temperatura_objetiva:({5}) fecha_registro:({6})"
        return texto.format(self.peso_objetivo, self.peso_obtenido,
                            self.humedad_objetiva, self.humedad_obtenida, self.temperatura_objetiva,
                            self.temperatura_obtenida, self.fecha_registro,)"""
