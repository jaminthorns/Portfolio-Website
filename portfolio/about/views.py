from django.shortcuts import render
from markdown import markdown
import os

# Page that displays about information (inherits base.html)
def about(request):
    # Get the path of the about text
    current_dir = os.path.dirname(__file__)
    about_text_path = os.path.join(current_dir, 'static/txt/about_text.txt')

    # Get the about text, rendered as markdown
    about_text = markdown(open(about_text_path).read())

    context = {
        'about_text': about_text,
    }

    return render(request, 'about/about.html', context)
