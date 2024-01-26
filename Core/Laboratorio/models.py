from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.utils import timezone

# Create your models here.

class User(models.Model):
    nombre = models.CharField(max_length=50, null=True)
    apellido = models.CharField(max_length=50, null=True)
    fecha_registro = models.DateTimeField(auto_now=True)

    
class Analisis(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('finalizado', 'Finalizado'),
        ('rechazado', 'Rechazado'),
    ]

    ticket = models.CharField(max_length=30, unique=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    us_recibe = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='usr_recibe')
    us_entrega = models.CharField(max_length=50, null=True)
    us_operador = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='usr_operador')
    fecha_inicio = models.DateTimeField(auto_now=True)
    fecha_fin = models.DateTimeField(auto_now=True)
    alcalinidad = models.DecimalField(max_digits=5, decimal_places=2, null=True, default=None)
    cloruro = models.DecimalField(max_digits=5, decimal_places=2, null=True, default=None)
    humedad = models.DecimalField(max_digits=5, decimal_places=2, null=True, default=None)
    activo = models.DecimalField(max_digits=5, decimal_places=2, null=True, default=None)
    otros_analisis = models.CharField(max_length=100, null=True, default=None)

# Función para generar campos antes de guardar en la DB
@receiver(pre_save, sender=Analisis)
def generar_numero_ticket(sender, instance, **kwargs):
    # Verifica si el objeto aún no tiene un número de ticket asignado
    if not instance.ticket:
        # Genera un nuevo número de ticket con "TICKET-" y ceros a la izquierda
        nuevo_ticket = "TICKET-{}".format(str(instance.pk).zfill(10))  # Ajusta el valor "10" según la longitud máxima deseada
        instance.ticket = nuevo_ticket
    
    # Verifica si el objeto está siendo creado por primera vez
    if not instance.pk:
        # Establece la fecha de inicio solo si es una creación
        instance.fecha_inicio = timezone.now()

    # Verifica si el estado es "finalizado"
    if instance.estado == 'finalizado':
        # Establece la fecha de fin solo si el estado es "finalizado"
        instance.fecha_fin = timezone.now()
    else:
        # Si el estado no es "finalizado", deja la fecha_fin como None
        instance.fecha_fin = None