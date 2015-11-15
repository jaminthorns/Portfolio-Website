from django.shortcuts import render
from django.http import JsonResponse
from .models import *

# Page that displays all projects (inherits base.html)
def projects(request):
    projects = Project.objects.all()

    context = {
        'projects': projects,
    }

    return render(request, 'projects/projects.html', context)

# Project detail chunk
def project_detail(request, project_id):
    project = Project.objects.get(id=project_id)

    context = {
        'project': project,
    }

    return render(request, 'projects/project_detail.html', context)
