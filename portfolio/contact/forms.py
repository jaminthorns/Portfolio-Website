from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(label='',
        widget=forms.TextInput(attrs={'class': 'contact-input name', 'placeholder': 'Name'}))
    email = forms.EmailField(label='',
        widget=forms.TextInput(attrs={'class': 'contact-input email', 'placeholder': 'Email'}))
    subject = forms.CharField(label='',
        widget=forms.TextInput(attrs={'class': 'contact-input subject', 'placeholder': 'Subject'}))
    message = forms.CharField(label='',
        widget=forms.Textarea(attrs={'class': 'contact-input message', 'placeholder': 'Message'}))
