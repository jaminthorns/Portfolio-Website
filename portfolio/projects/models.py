from django.db import models
from markdown import markdown

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    description_html = models.TextField(editable=False)

    def save(self):
        self.description_html = markdown(self.description)
        super(Project, self).save()

    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    image = models.ImageField(upload_to='project_images/')
    order = models.PositiveIntegerField()
    caption = models.CharField(max_length=255)
    project = models.ForeignKey(Project, related_name='images')

    class Meta:
        ordering = ['order']

class ProjectLink(models.Model):
    label = models.CharField(max_length=255)
    url = models.URLField()
    project = models.ForeignKey(Project, related_name='links')
