# Generated by Django 4.2.6 on 2023-10-19 14:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Tamu', '0004_remove_lineamodel_seccionid_lineaseccion_areaid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tamumodel',
            name='valores_registrados',
        ),
        migrations.AddField(
            model_name='tamumodel',
            name='fecha_registro',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='tamumodel',
            name='seccionId',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='tamumodel_seccion', to='Tamu.areamodel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tamumodel',
            name='temperatura_objetiva',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='areaId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tamumodel_area', to='Tamu.areamodel'),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='humedad_objetiva',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='humedad_obtenida',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='peso_objetivo',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='peso_obtenido',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='temperatura_obtenida',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
    ]
