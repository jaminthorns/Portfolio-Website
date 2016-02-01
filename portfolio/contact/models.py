from django.db import models

class Link(models.Model):

    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField()
    url = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    image = models.CharField(max_length=255)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
