from django.shortcuts import render
from django.conf import settings
from markdown import markdown
from datetime import datetime
import os

# Page that displays about information (inherits base.html)
def about(request):
    birthday = datetime.strptime(settings.BIRTHDAY, '%m/%d/%Y')
    age = int((datetime.today() - birthday).days / 365.2425) # Close enough

    context = {
        'age': age,
    }

    return render(request, 'about/about.html', context)
