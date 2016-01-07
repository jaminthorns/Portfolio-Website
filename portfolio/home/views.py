from django.shortcuts import render
from .models import *

# Home page
def home(request):
    return render(request, 'home/home.html')
