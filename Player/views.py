from django.shortcuts import render
from .models import *
from django.http import HttpResponse , HttpResponseRedirect
# Create your views here.


def Index(request):
    album = Album.objects.all()
    song = Song.objects.all()
    print(album)
    return render(request,"index.html",context={'album':album,'song':song,'top':song})


