from threading import Thread
from smtplib import SMTP
from email.mime.text import MIMEText
from django.shortcuts import render
from django.conf import settings
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
