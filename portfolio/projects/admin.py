from django.contrib import admin
from .models import *

class ProjectImageInline(admin.StackedInline):
    model = ProjectImage

class ProjectLinkInline(admin.StackedInline):
    model = ProjectLink

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectImageInline, ProjectLinkInline]

admin.site.register(Project, ProjectAdmin)
