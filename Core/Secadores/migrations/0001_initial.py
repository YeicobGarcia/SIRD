# Generated by Django 4.2.6 on 2024-02-12 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Linea1',
            fields=[
                ('linea1_ndx', models.AutoField(primary_key=True, serialize=False)),
                ('corrienteatomizador', models.FloatField(blank=True, db_column='CorrienteAtomizador', null=True)),
                ('flujojabon_fic200_1', models.FloatField(blank=True, db_column='FlujoJabon_FIC200_1', null=True)),
                ('flujosilicato_fic203_1', models.FloatField(blank=True, db_column='FlujoSilicato_FIC203_1', null=True)),
                ('lic200_1_porcent', models.FloatField(blank=True, db_column='LIC200_1_Porcent', null=True)),
                ('porcentajesilicato', models.FloatField(blank=True, db_column='PorcentajeSilicato', null=True)),
                ('presioninterc3_pic200_2', models.FloatField(blank=True, db_column='PresionInterc3_PIC200_2', null=True)),
                ('presionjabon_pit200_1', models.FloatField(blank=True, db_column='PresionJabon_PIT200_1', null=True)),
                ('presionjabonatm_pit200_3', models.FloatField(blank=True, db_column='PresionJabonAtm_PIT200_3', null=True)),
                ('sp_silicato', models.FloatField(blank=True, db_column='SP_Silicato', null=True)),
                ('tempe_inter_tit100_1', models.FloatField(blank=True, db_column='Tempe_Inter_TIT100_1', null=True)),
                ('tempe_inter_tit100_2', models.FloatField(blank=True, db_column='Tempe_Inter_TIT100_2', null=True)),
                ('tempe_inter_tit200_1', models.FloatField(blank=True, db_column='Tempe_Inter_TIT200_1', null=True)),
                ('vacioatmz_pit200_4', models.FloatField(blank=True, db_column='VacioAtmz_PIT200_4', null=True)),
                ('velocidad_p100_1', models.FloatField(blank=True, db_column='Velocidad_P100_1', null=True)),
                ('velocidad_p200_1', models.FloatField(blank=True, db_column='Velocidad_P200_1', null=True)),
                ('velocidad_pl204_1', models.FloatField(blank=True, db_column='Velocidad_PL204_1', null=True)),
                ('t_stamp', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Linea6',
            fields=[
                ('linea6_ndx', models.AutoField(primary_key=True, serialize=False)),
                ('corrienteatomizador', models.FloatField(blank=True, db_column='CorrienteAtomizador', null=True)),
                ('flujojabon_fic200_1', models.FloatField(blank=True, db_column='FlujoJabon_FIC200_1', null=True)),
                ('flujosilicato_fic203_1', models.FloatField(blank=True, db_column='FlujoSilicato_FIC203_1', null=True)),
                ('nivel_lit100_1', models.FloatField(blank=True, db_column='Nivel_LIT100_1', null=True)),
                ('porcentajesilicato', models.FloatField(blank=True, db_column='PorcentajeSilicato', null=True)),
                ('presioninterc3_pic200_2', models.FloatField(blank=True, db_column='PresionInterc3_PIC200_2', null=True)),
                ('presionjabonatz_pit200_3', models.FloatField(blank=True, db_column='PresionJabonAtz_PIT200_3', null=True)),
                ('tempinterc3_tit200_1', models.FloatField(blank=True, db_column='TempInterc3_TIT200_1', null=True)),
                ('vacioatmz_pit200_4', models.FloatField(blank=True, db_column='VacioAtmz_PIT200_4', null=True)),
                ('velocidad_p100_1', models.FloatField(blank=True, db_column='Velocidad_P100_1', null=True)),
                ('t_stamp', models.DateTimeField(blank=True, null=True)),
                ('sp_silicato', models.FloatField(blank=True, db_column='SP_Silicato', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Linea7',
            fields=[
                ('linea7_ndx', models.AutoField(primary_key=True, serialize=False)),
                ('corrienteatomizador', models.FloatField(blank=True, db_column='CorrienteAtomizador', null=True)),
                ('flujojabon_fic200_1', models.FloatField(blank=True, db_column='FlujoJabon_FIC200_1', null=True)),
                ('flujosilicato_fic203_1', models.FloatField(blank=True, db_column='FlujoSilicato_FIC203_1', null=True)),
                ('porcentajesilicato', models.FloatField(blank=True, db_column='PorcentajeSilicato', null=True)),
                ('presion_interc3_pic200_2', models.FloatField(blank=True, db_column='Presion_Interc3_PIC200_2', null=True)),
                ('presionjabon_pit200_1', models.FloatField(blank=True, db_column='PresionJabon_PIT200_1', null=True)),
                ('presionjabonatm_pit200_3', models.FloatField(blank=True, db_column='PresionJabonAtm_PIT200_3', null=True)),
                ('tempe_inter_tit100_1', models.FloatField(blank=True, db_column='Tempe_Inter_TIT100_1', null=True)),
                ('tempe_inter_tit100_2', models.FloatField(blank=True, db_column='Tempe_Inter_TIT100_2', null=True)),
                ('tempe_inter_tit200_1', models.FloatField(blank=True, db_column='Tempe_Inter_TIT200_1', null=True)),
                ('totalperfume', models.FloatField(blank=True, db_column='TotalPerfume', null=True)),
                ('vacioatz_pit200_4', models.FloatField(blank=True, db_column='VacioAtz_PIT200_4', null=True)),
                ('velocidad_p100_1', models.FloatField(blank=True, db_column='Velocidad_P100_1', null=True)),
                ('velocidad_p100_2', models.FloatField(blank=True, db_column='Velocidad_P100_2', null=True)),
                ('t_stamp', models.DateTimeField(blank=True, null=True)),
                ('sp_silicato', models.FloatField(blank=True, db_column='SP_Silicato', null=True)),
            ],
        ),
    ]
