# Generated by Django 4.2.6 on 2023-10-19 15:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Tamu', '0005_remove_tamumodel_valores_registrados_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='skumodel',
            name='temperatura_objetiva',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='areaId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tamu.areamodel'),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='seccionId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tamu.lineaseccion'),
        ),
    ]
