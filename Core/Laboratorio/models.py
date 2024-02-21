from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class UserLab(models.Model):
    nombre = models.CharField(max_length=50, null=True)
    apellido = models.CharField(max_length=50, null=True)
    fecha_registro = models.DateTimeField(auto_now=True)

    
class Analisis(models.Model):
    ESTADO_CHOICES = [
        ('en proceso', 'Pendiente'),
        ('finalizado', 'Finalizado'),
        ('cancelado', 'Rechazado'),
    ]

    ticket = models.CharField(max_length=30, unique=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='en proceso')
    us_recibe = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='usr_recibe')
    us_entrega = models.ForeignKey(UserLab, on_delete=models.CASCADE, null=True, related_name='usr_entrega')
    fecha_inicio = models.DateTimeField(default=timezone.now)
    fecha_fin = models.DateTimeField(default=None, blank=True, null=True)
    alcalinidad = models.DecimalField(max_digits=5, decimal_places=2, null=True, default=None)
    cloruro = models.DecimalField(max_digits=5, decimal_places=2, null=True, default=None)
    humedad = models.DecimalField(max_digits=5, decimal_places=2, null=True, default=None)
    activo = models.DecimalField(max_digits=5, decimal_places=2, null=True, default=None)
    otros_analisis = models.CharField(max_length=100, null=True, default=None)
    solicitud_total = models.CharField(max_length=150, null=True, default=None)

    # Indicador para evitar el bucle infinito
    _is_updating = False

# Función para generar campos después de guardar en la DB
@receiver(post_save, sender=Analisis)
def generar_numero_ticket(sender, instance, created, **kwargs):
    # Verifica si el objeto está siendo creado por primera vez
    if created and not instance.ticket:
        # Genera un nuevo número de ticket con "TICKET-" y ceros a la izquierda
        nuevo_ticket = "TICKET-{}".format(str(instance.pk).zfill(10))  # Ajusta el valor "10" según la longitud máxima deseada
        instance.ticket = nuevo_ticket
        instance.save()  # Guarda el objeto nuevamente con el número de ticket actualizado
    elif not instance._is_updating:  # Verifica si no está en proceso de actualización
        instance._is_updating = True  # Establece la bandera de actualización.

        # Verifica si el estado es "finalizado"
        if instance.estado == 'finalizado':
            # Establece la fecha de fin solo si el estado es "finalizado"
            instance.fecha_fin = timezone.now()
            #instance.save()  # Guarda el objeto nuevamente con la fecha de fin actualizada
        else:
            # Si el estado no es "finalizado", deja la fecha_fin como None
            instance.fecha_fin = None
        
        instance.save()  # Guarda el objeto nuevamente con las fechas actualizadas
        
        instance._is_updating = False  # Restablece la bandera de actualización