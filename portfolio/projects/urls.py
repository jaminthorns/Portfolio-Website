from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.projects, name='projects'),
    url(r'^project_detail/(?P<project_id>[0-9]+)$', views.project_detail, name='project_detail'),
]
