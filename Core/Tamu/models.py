from django.db import models



class AreaModel(models.Model):
    nombre = models.CharField(max_length=50, null=True)

class SKUModel(models.Model):
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=100, null=True)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=0, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=0,  null=True)
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=0,  null=True)

class LineaSeccion(models.Model):
    nombre = models.CharField(max_length=5, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE, null=True, blank=True)

class LineaModel(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)

class TamuModel(models.Model):
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE, null=True)
    skuID = models.ForeignKey(SKUModel, on_delete=models.CASCADE, null=True)
    lineaId = models.ForeignKey(LineaModel, on_delete=models.CASCADE, null=True)
    seccionId = models.ForeignKey(LineaSeccion, on_delete=models.CASCADE, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    peso_obtenido = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    humedad_obtenida = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    temperatura_obtenida = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    fecha_registro = models.DateTimeField(auto_now=True)
