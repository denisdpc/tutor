from django.shortcuts import render
from django.http import HttpResponse
from django_htmx.http import push_url, reswap, retarget, trigger_client_event
import random

from .forms import FilForm

def index(request):
    
    if request.htmx:
        print('HTMX')
        form = FilForm(request.GET)
        if form.is_valid():
            #return HttpResponse("successfully submitted form")
            response = HttpResponse("successfully submitted form")
            return trigger_client_event(response, 'film-added')    
        context = {'form': form}
        response = render(request, 'form.html', context)
        return retarget(response, '#page-content')
    else:
        print('no HTMX')
        context = {'form': FilForm()}
        return render(request, 'index.html', context)

def success(request):
    if random.random() < 0.35:
        print("pooling terminating ...")
        return HttpResponseStopPolling()
    
    return HttpResponse("congratulações - sucesso")