from django.views import View
from django.http import JsonResponse
from django.shortcuts import render
from .models import User
from django.views.generic import TemplateView
# Create your views here.

class NewAnalisis(TemplateView):
    template_name = 'app/ingresoLab.html'
    
    
    def CR_User(request):
        firstName = request.GET.get('firstName')
        lastName = request.GET.get('lastName')
        print(firstName)
        print(lastName)

        try:
            addUser = User(nombre = firstName, apellido = lastName)
            addUser.save()
            return JsonResponse({'message': "Success"})
        except Exception as e:
            print(e)
            return JsonResponse({'message': False, 'error': str(e)})

    def getUsers(request):
        users = User.objects.values()

        if(len(users)>0):
            data = {'message': "Success", 'User': list(users)}
        else:
            data = {'message': "No encontrado"}
            
        return JsonResponse(data)
    
"""class CR_User(View):

    def post(self, request, *args, **kwargs):
        firstName = request.GET.get('firstName')
        lastName = request.GET.get('lastName')

        try:
            addUser = User(nombre = firstName, apellido = lastName)
            addUser.save()
            return JsonResponse({'success': True})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'error': str(e)})

    def getUsers(request):
        users = User.objects.values()

        if(len(users)>0):
            data = {'message': "Success", 'User': list(users)}
        else:
            data = {'message': "No encontrado"}

        print('aca los users', data)
        return JsonResponse(data)"""

