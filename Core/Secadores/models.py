from django.db import models

class Linea1(models.Model):
    linea1_ndx = models.AutoField(primary_key=True)
    corrienteatomizador = models.FloatField(db_column='CorrienteAtomizador', blank=True, null=True)  # Field name made lowercase.
    flujojabon_fic200_1 = models.FloatField(db_column='FlujoJabon_FIC200_1', blank=True, null=True)  # Field name made lowercase.
    flujosilicato_fic203_1 = models.FloatField(db_column='FlujoSilicato_FIC203_1', blank=True, null=True)  # Field name made lowercase.
    lic200_1_porcent = models.FloatField(db_column='LIC200_1_Porcent', blank=True, null=True)  # Field name made lowercase.
    porcentajesilicato = models.FloatField(db_column='PorcentajeSilicato', blank=True, null=True)  # Field name made lowercase.
    presioninterc3_pic200_2 = models.FloatField(db_column='PresionInterc3_PIC200_2', blank=True, null=True)  # Field name made lowercase.
    presionjabon_pit200_1 = models.FloatField(db_column='PresionJabon_PIT200_1', blank=True, null=True)  # Field name made lowercase.
    presionjabonatm_pit200_3 = models.FloatField(db_column='PresionJabonAtm_PIT200_3', blank=True, null=True)  # Field name made lowercase.
    sp_silicato = models.FloatField(db_column='SP_Silicato', blank=True, null=True)  # Field name made lowercase.
    tempe_inter_tit100_1 = models.FloatField(db_column='Tempe_Inter_TIT100_1', blank=True, null=True)  # Field name made lowercase.
    tempe_inter_tit100_2 = models.FloatField(db_column='Tempe_Inter_TIT100_2', blank=True, null=True)  # Field name made lowercase.
    tempe_inter_tit200_1 = models.FloatField(db_column='Tempe_Inter_TIT200_1', blank=True, null=True)  # Field name made lowercase.
    vacioatmz_pit200_4 = models.FloatField(db_column='VacioAtmz_PIT200_4', blank=True, null=True)  # Field name made lowercase.
    velocidad_p100_1 = models.FloatField(db_column='Velocidad_P100_1', blank=True, null=True)  # Field name made lowercase.
    velocidad_p200_1 = models.FloatField(db_column='Velocidad_P200_1', blank=True, null=True)  # Field name made lowercase.
    velocidad_pl204_1 = models.FloatField(db_column='Velocidad_PL204_1', blank=True, null=True)  # Field name made lowercase.
    t_stamp = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'linea1'


class Linea6(models.Model):
    linea6_ndx = models.AutoField(primary_key=True)
    corrienteatomizador = models.FloatField(db_column='CorrienteAtomizador', blank=True, null=True)  # Field name made lowercase.
    flujojabon_fic200_1 = models.FloatField(db_column='FlujoJabon_FIC200_1', blank=True, null=True)  # Field name made lowercase.
    flujosilicato_fic203_1 = models.FloatField(db_column='FlujoSilicato_FIC203_1', blank=True, null=True)  # Field name made lowercase.
    nivel_lit100_1 = models.FloatField(db_column='Nivel_LIT100_1', blank=True, null=True)  # Field name made lowercase.
    porcentajesilicato = models.FloatField(db_column='PorcentajeSilicato', blank=True, null=True)  # Field name made lowercase.
    presioninterc3_pic200_2 = models.FloatField(db_column='PresionInterc3_PIC200_2', blank=True, null=True)  # Field name made lowercase.
    presionjabonatz_pit200_3 = models.FloatField(db_column='PresionJabonAtz_PIT200_3', blank=True, null=True)  # Field name made lowercase.
    tempinterc3_tit200_1 = models.FloatField(db_column='TempInterc3_TIT200_1', blank=True, null=True)  # Field name made lowercase.
    vacioatmz_pit200_4 = models.FloatField(db_column='VacioAtmz_PIT200_4', blank=True, null=True)  # Field name made lowercase.
    velocidad_p100_1 = models.FloatField(db_column='Velocidad_P100_1', blank=True, null=True)  # Field name made lowercase.
    t_stamp = models.DateTimeField(blank=True, null=True)
    sp_silicato = models.FloatField(db_column='SP_Silicato', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'linea6'


class Linea7(models.Model):
    linea7_ndx = models.AutoField(primary_key=True)
    corrienteatomizador = models.FloatField(db_column='CorrienteAtomizador', blank=True, null=True)  # Field name made lowercase.
    flujojabon_fic200_1 = models.FloatField(db_column='FlujoJabon_FIC200_1', blank=True, null=True)  # Field name made lowercase.
    flujosilicato_fic203_1 = models.FloatField(db_column='FlujoSilicato_FIC203_1', blank=True, null=True)  # Field name made lowercase.
    porcentajesilicato = models.FloatField(db_column='PorcentajeSilicato', blank=True, null=True)  # Field name made lowercase.
    presion_interc3_pic200_2 = models.FloatField(db_column='Presion_Interc3_PIC200_2', blank=True, null=True)  # Field name made lowercase.
    presionjabon_pit200_1 = models.FloatField(db_column='PresionJabon_PIT200_1', blank=True, null=True)  # Field name made lowercase.
    presionjabonatm_pit200_3 = models.FloatField(db_column='PresionJabonAtm_PIT200_3', blank=True, null=True)  # Field name made lowercase.
    tempe_inter_tit100_1 = models.FloatField(db_column='Tempe_Inter_TIT100_1', blank=True, null=True)  # Field name made lowercase.
    tempe_inter_tit100_2 = models.FloatField(db_column='Tempe_Inter_TIT100_2', blank=True, null=True)  # Field name made lowercase.
    tempe_inter_tit200_1 = models.FloatField(db_column='Tempe_Inter_TIT200_1', blank=True, null=True)  # Field name made lowercase.
    totalperfume = models.FloatField(db_column='TotalPerfume', blank=True, null=True)  # Field name made lowercase.
    vacioatz_pit200_4 = models.FloatField(db_column='VacioAtz_PIT200_4', blank=True, null=True)  # Field name made lowercase.
    velocidad_p100_1 = models.FloatField(db_column='Velocidad_P100_1', blank=True, null=True)  # Field name made lowercase.
    velocidad_p100_2 = models.FloatField(db_column='Velocidad_P100_2', blank=True, null=True)  # Field name made lowercase.
    t_stamp = models.DateTimeField(blank=True, null=True)
    sp_silicato = models.FloatField(db_column='SP_Silicato', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'linea7'
