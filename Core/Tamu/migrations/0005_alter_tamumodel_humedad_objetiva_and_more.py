# Generated by Django 4.2.6 on 2024-03-21 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tamu', '0004_alter_skumodel_humedad_objetiva_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tamumodel',
            name='humedad_objetiva',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='humedad_obtenida',
            field=models.CharField(blank=True, default=0, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='peso_objetivo',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='peso_obtenido',
            field=models.CharField(blank=True, default=0, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='temperatura_objetiva',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='tamumodel',
            name='temperatura_obtenida',
            field=models.CharField(blank=True, default=0, max_length=6, null=True),
        ),
    ]
