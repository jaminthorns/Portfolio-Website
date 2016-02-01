from threading import Thread
from smtplib import SMTP
from email.mime.text import MIMEText
from random import choice
from django.shortcuts import render
from django.conf import settings
from .models import *
from .forms import *


# Page for a contact form
def contact(request):
    # Validate message
    if request.method == 'POST':
        contact_form = ContactForm(request.POST)

        # Send message
        if contact_form.is_valid():
            msg_thread = Thread(target=send_message, args=(request,))
            msg_thread.start()

    context = {
        'links': Link.objects.all(),
        'term': internet_term(),
        'contact_form': ContactForm(),
    }

    return render(request, 'contact/contact.html', context)

# Send a message via SMTP
def send_message(request):
    msg = MIMEText(request.POST['message'])
    msg['Subject'] = request.POST['subject']
    msg['From'] = request.POST['email']
    msg['To'] = settings.EMAIL

    smtp = SMTP('localhost')
    smtp.send_message(msg)
    smtp.quit()

# Generate a kooky internet term from https://xkcd.com/181/
def internet_term():
    prefixes = ['World Wide ', 'Inter', 'Blogo', 'Web']
    suffixes = ['net', 'web', 'sphere', 'tubes', 'blag']

    prefix = choice(prefixes)
    suffix = choice(suffixes)

    # Capitalize suffix if preceded by space
    if prefix[-1] == ' ':
        suffix = suffix[0].upper() + suffix[1:]

    return prefix + suffix
