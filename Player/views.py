from django.shortcuts import render
from .models import *
from django.http import HttpResponse
import json
# Create your views here.


def Index(request):
    album = Album.objects.all()
    song = Song.objects.all()
    
    return render(request,"index.html",context={'album':album,'song':song,'top':song})


def getUrl(request):
    print(request.POST)
    what = request.POST.get('what')
    which = int(request.POST.get('which'))
    if what == 'song':
        s = Song.objects.get(pk=which)
        return HttpResponse('/media/'+str(s.audio))
    elif what == 'album':
        a=Album.objects.get(pk=which)
        f=[]
        f.append(str(a.name))
        f.append(str(a.author))
        f.append(str(a.pic))

        ss = a.song_set.all()

        f.append((len(ss)))
        for i in ss:
            f.append(str(i.pk))
            f.append(str(a.name))
            f.append(str(a.author))
            f.append('/media/'+str(a.pic))
        print(json.dumps(f))
        return HttpResponse(json.dumps(f))


