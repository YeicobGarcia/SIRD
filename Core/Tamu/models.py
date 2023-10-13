from django.db import models



class AreaModel(models.Model):
    nombre = models.CharField(max_length=50, null=True)

class SKUModel(models.Model):
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=100, null=True)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2,  null=True)

class LineaSeccion(models.Model):
    nombre = models.CharField(max_length=5, null=True)

class LineaModel(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)
    seccionId = models.ForeignKey(LineaSeccion, on_delete=models.CASCADE, null=True)

class TamuModel(models.Model):
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)
    skuID = models.ForeignKey(SKUModel, on_delete=models.CASCADE)
    lineaId = models.ForeignKey(LineaModel, on_delete=models.CASCADE)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    peso_obtenido = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    humedad_obtenida = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    temperatura_obtenida = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    valores_registrados = models.DateTimeField(auto_now=True)
