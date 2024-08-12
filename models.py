# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group_id = models.IntegerField()
    permission_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type_id = models.IntegerField()
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type_id', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user_id = models.IntegerField()
    group_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_user_groups'


class AuthUserUserPermissions(models.Model):
    user_id = models.IntegerField()
    permission_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class LaboratorioAnalisis(models.Model):
    id = models.BigAutoField(primary_key=True)
    ticket = models.CharField(unique=True, max_length=30)
    estado = models.CharField(max_length=20)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField(blank=True, null=True)
    alcalinidad = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    cloruro = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    humedad = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    activo = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    otros_analisis = models.CharField(max_length=100, blank=True, null=True)
    solicitud_total = models.CharField(max_length=150, blank=True, null=True)
    us_entrega = models.ForeignKey('LaboratorioUserlab', models.DO_NOTHING, blank=True, null=True)
    us_recibe = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'laboratorio_analisis'


class LaboratorioUserlab(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=50, blank=True, null=True)
    apellido = models.CharField(max_length=50, blank=True, null=True)
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'laboratorio_userlab'


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
        managed = False
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
        managed = False
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
        managed = False
        db_table = 'linea7'


class TamuAreamodel(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tamu_areamodel'


class TamuLinea(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    areaid = models.ForeignKey(TamuAreamodel, models.DO_NOTHING, db_column='areaId_id', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tamu_linea'


class TamuLineaseccion(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=5, blank=True, null=True)
    areaid = models.ForeignKey(TamuAreamodel, models.DO_NOTHING, db_column='areaId_id', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tamu_lineaseccion'


class TamuSkumodel(models.Model):
    id = models.BigAutoField(primary_key=True)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    areaid = models.ForeignKey(TamuAreamodel, models.DO_NOTHING, db_column='areaId_id')  # Field name made lowercase.
    codigosku = models.CharField(db_column='codigoSKU', unique=True, max_length=30, blank=True, null=True)  # Field name made lowercase.
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'tamu_skumodel'


class TamuTamumodel(models.Model):
    id = models.BigAutoField(primary_key=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    peso_obtenido = models.CharField(max_length=6, blank=True, null=True)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    humedad_obtenida = models.CharField(max_length=6, blank=True, null=True)
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    temperatura_obtenida = models.CharField(max_length=6, blank=True, null=True)
    fecha_registro = models.DateTimeField()
    areaid = models.ForeignKey(TamuAreamodel, models.DO_NOTHING, db_column='areaId_id', blank=True, null=True)  # Field name made lowercase.
    lineaid = models.ForeignKey(TamuLinea, models.DO_NOTHING, db_column='lineaId_id', blank=True, null=True)  # Field name made lowercase.
    seccionid = models.ForeignKey(TamuLineaseccion, models.DO_NOTHING, db_column='seccionId_id', blank=True, null=True)  # Field name made lowercase.
    skuid = models.ForeignKey(TamuSkumodel, models.DO_NOTHING, db_column='skuID_id', blank=True, null=True)  # Field name made lowercase.
    quien_registra = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tamu_tamumodel'


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
