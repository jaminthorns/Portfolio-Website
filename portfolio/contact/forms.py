from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(label='',
        widget=forms.TextInput(attrs={'class': 'contact-input name',
                                      'required': True,
                                      'placeholder': 'Name'}))
    email = forms.EmailField(label='',
        widget=forms.TextInput(attrs={'class': 'contact-input email',
                                      'placeholder': 'Email',
                                      'required': True,
                                      'type': 'email'}))
    subject = forms.CharField(label='',
        widget=forms.TextInput(attrs={'class': 'contact-input subject',
                                      'required': True,
                                      'placeholder': 'Subject'}))
    message = forms.CharField(label='',
        widget=forms.Textarea(attrs={'class': 'contact-input message',
                                     'required': True,
                                     'placeholder': 'Message'}))
