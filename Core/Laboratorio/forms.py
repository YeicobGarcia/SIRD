from django import forms
from .models import Analisis, User

class AnalisisForms(forms.ModelForm):

    """us_entrega = forms.CharField(widget=forms.Select(attrs={'class':'form-control OpTurno','id':'cboUser','name':'state','style':'width: 100%;'}))
    
    us_entrega = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control p-1','placeholder':'Agregar nuevo Usuario',
                        'aria-label':'Username','aria-describedby':'addon-wrapping'}))"""
    
    """alcalinidad = forms.DecimalField(widget=forms.CheckboxInput(attrs={'class':'flat'}))

    cloruro = forms.DecimalField(widget=forms.CheckboxInput(attrs={'class':'flat'}))

    humedad = forms.DecimalField(widget=forms.CheckboxInput(attrs={'class':'flat'}))

    activo = forms.DecimalField(widget=forms.CheckboxInput(attrs={'class':'flat'}))

    otros_analisis = forms.CharField(widget=forms.CheckboxInput(attrs={'class':'flat'}))"""

    class Meta:
        model = Analisis
        #fields = '__all__' #Para mostrar todo los campos del modelo en el mismo orden en que estan

        fields = ['us_recibe','us_entrega','us_operador','alcalinidad','cloruro','humedad','activo','otros_analisis']


class NewUserForm(forms.ModelForm):

    nombre = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Agregar nuevo Usuario',
                        'aria-label':'Username','aria-describedby':'addon-wrapping'}))
    
    class Meta:
        model = User

        fields = '__all__'