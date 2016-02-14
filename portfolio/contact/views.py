from smtplib import SMTP
from email.mime.text import MIMEText
from random import choice
from urllib.parse import urlencode, quote_plus, unquote_plus
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from .models import *
from .forms import *


# Page for a contact form
def contact(request):
    # Validate message
    if request.method == 'POST':
        contact_form = ContactForm(request.POST)

        # Send message
        if contact_form.is_valid():
            send_message(request)

        if request.is_ajax():
            return HttpResponse('')

    context = {
        'links': Link.objects.all(),
        'term': internet_term(),
        'contact_form': ContactForm(),
    }

    return render(request, 'contact/contact.html', context)

# Send a message via SMTP
def send_message(request):
    # Build reply link parameters
    reply = {
        'subject': 'RE: ' + request.POST['subject'],
        'body': '\n\n\nIn response to your message:\n\n{message}{ellipsis}'.format(
            message=unquote_plus(quote_plus(request.POST['message'])[:1000]),
            ellipsis=('...' if len(quote_plus(request.POST['message'])) > 1000 else ''))
    }

    # Build reply link
    reply_link = '<a href="mailto:{email}?{reply}">{email}</a>'.format(
        email=request.POST['email'], reply=urlencode(reply))

    # Build message
    message = """
    <html>
        <p>From: {reply}</p>
        <pre>{message}</pre>
    </html>
    """.format(reply=reply_link, message=request.POST['message'])

    # Build email
    msg = MIMEText(message, 'html')
    msg['Subject'] = request.POST['subject']
    msg['From'] = 'contact@' + request.get_host()
    msg['To'] = settings.EMAIL

    # Send email
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
