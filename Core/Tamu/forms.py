from django import forms
from .models import SKUModel

class SKU_FORM(forms.ModelForm):
    
    class Meta:
        model = SKUModel
        fields = ['codigoSKU', 'descripcion', 'humedad_objetiva', 'peso_objetivo', 'temperatura_objetiva', 'areaId']

        widgets = {
            'areaId': forms.RadioSelect(choices=((1, 'Lavandería'), (2, 'Tocador'))),
        }

class SKU_FORM_EDIT(forms.ModelForm):
    
    class Meta:
        model = SKUModel
        fields = ['humedad_objetiva', 'peso_objetivo', 'temperatura_objetiva']
