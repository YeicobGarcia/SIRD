# Generated by Django 4.2.6 on 2024-02-13 10:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Secadores', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='linea1',
            options={'managed': True},
        ),
        migrations.AlterModelOptions(
            name='linea6',
            options={'managed': True},
        ),
        migrations.AlterModelOptions(
            name='linea7',
            options={'managed': True},
        ),
        migrations.AlterModelTable(
            name='linea1',
            table='linea1',
        ),
        migrations.AlterModelTable(
            name='linea6',
            table='linea6',
        ),
        migrations.AlterModelTable(
            name='linea7',
            table='linea7',
        ),
    ]
