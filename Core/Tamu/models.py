from django.db import models



class AreaModel(models.Model):
    nombre = models.CharField(max_length=50, null=False)

class SKUModel(models.Model):
    descripcion = models.CharField(max_length=100, null=False)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2,  null=False)

class LineaModel(models.Model):
    nombre = models.CharField(max_length=100, null=False)
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)

class TamuModel(models.Model):
    areaId = models.ForeignKey(AreaModel, on_delete=models.CASCADE)
    skuID = models.ForeignKey(SKUModel, on_delete=models.CASCADE)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    peso_obtenido = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    humedad_obtenida = models.DecimalField(max_digits=5, decimal_places=2, null=False)
