# Generated by Django 4.2.6 on 2024-03-15 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tamu', '0002_tamumodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='skumodel',
            name='fecha_registro',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
