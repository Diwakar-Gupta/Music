from django.db import models

# Create your models here.


class Album(models.Model):
    pic = models.ImageField(default='/static/default_album.jpg',editable=True,blank=True, null=True)
    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)


class Song(models.Model):
    pic = models.ImageField(default='/static/default_song.png',editable=True,blank=True, null=True)
    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    album = models.ForeignKey(Album,models.DO_NOTHING,blank=True, null=True)
    audio = models.FileField(blank=True, null=True)
    audioPath = models.CharField(max_length=200,blank=True, null=True)
    likes = models.IntegerField(default=0,blank=True,null=True,editable=True)
    dislikes = models.IntegerField(default=0, blank=True, null=True, editable=True)




