from django.shortcuts import render
from django.conf import settings
from markdown import markdown
from datetime import datetime
import os

# Page that displays about information (inherits base.html)
def about(request):
    # # Get the path of the about text
    # current_dir = os.path.dirname(__file__)
    # about_text_path = os.path.join(current_dir, 'static/txt/about_text.txt')

    # # Get the about text, rendered as markdown
    # about_text = markdown(open(about_text_path).read())

    birthday = datetime.strptime(settings.BIRTHDAY, '%m/%d/%Y')
    age = int((datetime.today() - birthday).days / 365) # Close enough

    context = {
        'age': age,
    }

    return render(request, 'about/about.html', context)
