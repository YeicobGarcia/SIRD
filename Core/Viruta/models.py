from django.db import models

# extraido de la base al modelo.

class Viruta(models.Model):
    viruta_ndx = models.AutoField(primary_key=True)
    dt_126_2_densidad_soda_c = models.IntegerField(db_column='DT_126_2_DENSIDAD_SODA_C', blank=True, null=True)  # Field name made lowercase.
    fic_126_104_flujo_salmuera = models.IntegerField(db_column='FIC_126_104_FLUJO_SALMUERA', blank=True, null=True)  # Field name made lowercase.
    fit_104_101_flujo_less = models.IntegerField(db_column='FIT_104_101_FLUJO_LESS', blank=True, null=True)  # Field name made lowercase.
    fit_126_1a_flujo_pko = models.IntegerField(db_column='FIT_126_1A_FLUJO_PKO', blank=True, null=True)  # Field name made lowercase.
    fit_126_1b_flujo_stearine = models.IntegerField(db_column='FIT_126_1B_FLUJO_STEARINE', blank=True, null=True)  # Field name made lowercase.
    fit_126_1c_flujo_sebo = models.IntegerField(db_column='FIT_126_1C_FLUJO_SEBO', blank=True, null=True)  # Field name made lowercase.
    fit_126_2_flujo_soda_c = models.IntegerField(db_column='FIT_126_2_FLUJO_SODA_C', blank=True, null=True)  # Field name made lowercase.
    fit_126_3_flujo_agua = models.IntegerField(db_column='FIT_126_3_FLUJO_AGUA', blank=True, null=True)  # Field name made lowercase.
    ji_204_101_corriente_atz = models.IntegerField(db_column='JI_204_101_CORRIENTE_ATZ', blank=True, null=True)  # Field name made lowercase.
    pit_126_10_presion_reactor = models.IntegerField(db_column='PIT_126_10_PRESION_REACTOR', blank=True, null=True)  # Field name made lowercase.
    pit_204_2_vacio_atz = models.IntegerField(db_column='PIT_204_2_VACIO_ATZ', blank=True, null=True)  # Field name made lowercase.
    pit_204_10_presion_jabon_y_entrada_atz = models.IntegerField(db_column='PIT_204_10_PRESION_JABON_Y_ENTRADA_ATZ', blank=True, null=True)  # Field name made lowercase.
    pit_204_50_presion_extrusor = models.IntegerField(db_column='PIT_204_50_PRESION_EXTRUSOR', blank=True, null=True)  # Field name made lowercase.
    tt_126_2_temp_soda_caustica = models.IntegerField(db_column='TT_126_2_TEMP_SODA_CAUSTICA', blank=True, null=True)  # Field name made lowercase.
    tt_126_5_temp_soda_c_agua_e_intercambiador = models.IntegerField(db_column='TT_126_5_TEMP_SODA_C_AGUA_E_INTERCAMBIADOR', blank=True, null=True)  # Field name made lowercase.
    tt_126_6_temp_grasas_intercambiador = models.IntegerField(db_column='TT_126_6_TEMP_GRASAS_INTERCAMBIADOR', blank=True, null=True)  # Field name made lowercase.
    tt_126_9_temp_reactor = models.IntegerField(db_column='TT_126_9_TEMP_REACTOR', blank=True, null=True)  # Field name made lowercase.
    tt_126_18_temp_salida_turbo = models.IntegerField(db_column='TT_126_18_TEMP_SALIDA_TURBO', blank=True, null=True)  # Field name made lowercase.
    tt_206_1_temp_salida_condensador = models.IntegerField(db_column='TT_206_1_TEMP_SALIDA_CONDENSADOR', blank=True, null=True)  # Field name made lowercase.
    tt_206_2_temp_entrada_condensador = models.IntegerField(db_column='TT_206_2_TEMP_ENTRADA_CONDENSADOR', blank=True, null=True)  # Field name made lowercase.
    tt_206_3_temp_agua_enfriamiento = models.IntegerField(db_column='TT_206_3_TEMP_AGUA_ENFRIAMIENTO', blank=True, null=True)  # Field name made lowercase.
    t_stamp = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'viruta'