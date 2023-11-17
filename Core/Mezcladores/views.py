
from django.views.generic import TemplateView


class Ordenes(TemplateView):

    template_name = 'app/Ordenes.html'

class ConsumoG(TemplateView):

    template_name = 'app/ConsumoG.html'

class ConsumoPMP(TemplateView):

    template_name = 'app/ConsumoPMP.html'
