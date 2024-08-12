# Generated by Django 4.2.6 on 2024-02-15 20:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserLab',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50, null=True)),
                ('apellido', models.CharField(max_length=50, null=True)),
                ('fecha_registro', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Analisis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticket', models.CharField(max_length=30, unique=True)),
                ('estado', models.CharField(choices=[('en proceso', 'Pendiente'), ('finalizado', 'Finalizado'), ('cancelado', 'Rechazado')], default='en proceso', max_length=20)),
                ('fecha_inicio', models.DateTimeField(default=django.utils.timezone.now)),
                ('fecha_fin', models.DateTimeField(blank=True, default=None, null=True)),
                ('alcalinidad', models.DecimalField(decimal_places=2, default=None, max_digits=5, null=True)),
                ('cloruro', models.DecimalField(decimal_places=2, default=None, max_digits=5, null=True)),
                ('humedad', models.DecimalField(decimal_places=2, default=None, max_digits=5, null=True)),
                ('activo', models.DecimalField(decimal_places=2, default=None, max_digits=5, null=True)),
                ('otros_analisis', models.CharField(default=None, max_length=100, null=True)),
                ('solicitud_total', models.CharField(default=None, max_length=150, null=True)),
                ('us_entrega', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='usr_entrega', to='Laboratorio.userlab')),
                ('us_recibe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='usr_recibe', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]