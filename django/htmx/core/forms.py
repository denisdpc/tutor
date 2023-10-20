from django import forms

class FilForm(forms.Form):
    name = forms.CharField()

    def clean_name(self):
        if self.cleaned_data.get('name').startswith("a"):
            raise forms.ValidationError("cannot starts with 'a' ")