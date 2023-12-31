"""
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


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
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


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
    id = models.BigAutoField(primary_key=True)
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
    areaid_id = models.BigIntegerField(db_column='areaId_id', blank=True, null=True)  # Field name made lowercase.

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
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    areaid = models.ForeignKey(TamuAreamodel, models.DO_NOTHING, db_column='areaId_id')  # Field name made lowercase.
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tamu_skumodel'


class TamuTamumodel(models.Model):
    id = models.BigAutoField(primary_key=True)
    peso_objetivo = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    peso_obtenido = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    humedad_objetiva = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    humedad_obtenida = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    areaid = models.ForeignKey(TamuAreamodel, models.DO_NOTHING, db_column='areaId_id', blank=True, null=True)  # Field name made lowercase.
    skuid = models.ForeignKey(TamuSkumodel, models.DO_NOTHING, db_column='skuID_id', blank=True, null=True)  # Field name made lowercase.
    lineaid_id = models.BigIntegerField(db_column='lineaId_id', blank=True, null=True)  # Field name made lowercase.
    temperatura_obtenida = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    fecha_registro = models.DateTimeField()
    seccionid = models.ForeignKey(TamuLineaseccion, models.DO_NOTHING, db_column='seccionId_id', blank=True, null=True)  # Field name made lowercase.
    temperatura_objetiva = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tamu_tamumodel'
"""