from django.shortcuts import render
from .forms import *

# Page for a contact form
def contact(request):
    if request.method == 'POST':
        contact_form = ContactForm(request.POST)
        print(contact_form.is_valid())

    contact_form = ContactForm()

    context = {
        'contact_form': contact_form,
    }

    return render(request, 'contact/contact.html', context)
