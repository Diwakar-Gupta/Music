from django.shortcuts import render
from .models import *
from django.http import HttpResponse
import json
# Create your views here.


def Index(request):
    album = Album.objects.all()
    song = Song.objects.all()
    
    return render(request,"home.html",context={'album':album,'song':song,'top':song,})


def getPage(request):
    which=request.POST.get('which')

    album = Album.objects.all()
    song = Song.objects.all()

    if which == 'index':
        return render(request,'index.html',context={'album':album,'song':song})
    else :
        return render(request,'song.html',context={'album':album,'song':song})


def search(request):
    value=request.POST.get('what')

    result = []
    
    for s in Album.objects.all():
        if s.name.lower().startswith(value):
            obj={}
            obj['isSong']=False
            obj['pk']=s.pk
            obj['name']=s.name
            obj['pic']=str(s.pic)
            #obj['songs']=[{'pk':i.pk,'name':i.name,'pic':'/media/'+str(i.pic)} for i in s.song_set.all()]
            result.append(obj)
    if len(result)>=10:
        return HttpResponse(json.dumps(result))

    for s in Song.objects.all():
        if s.name.lower().startswith(value):
            obj={}
            obj['isSong']=True
            obj['pk']=s.pk
            obj['name']=s.name
            obj['pic']=str(s.pic)
            result.append(obj)

    return HttpResponse(json.dumps(result))


def getUrl(request):
    print(request.POST)
    what = request.POST.get('what')
    which = int(request.POST.get('which'))
    if what == 'song':
        s = Song.objects.get(pk=which)
        return HttpResponse('/media/'+str(s.audio))
    elif what == 'album':
        a=Album.objects.get(pk=which)
        f={}
        f['name']=str(a.name)
        f['author']=str(a.author)
        f['pic']=str(a.pic)

        f['songs'] = [{'pk':i.pk,'name':i.name,'pic':str(i.pic)} for i in a.song_set.all()]

        print(json.dumps(f))
        return HttpResponse(json.dumps(f))


