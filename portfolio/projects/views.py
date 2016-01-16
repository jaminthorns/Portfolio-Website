from django.shortcuts import render
from .models import *

# Page that displays all projects (inherits base.html)
def projects(request):
    context = {
        'projects': Project.objects.all(),
    }

    return render(request, 'projects/projects.html', context)

# Project detail chunk
def project_detail(request, project_id):
    context = {
        'project': Project.objects.get(id=project_id),
    }

    return render(request, 'projects/project_detail.html', context)
