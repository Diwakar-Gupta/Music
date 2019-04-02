from django.db import models

# Create your models here.


class Album(models.Model):
    pic = models.ImageField(default='/static/default_album.jpg',editable=True,blank=True, null=True)
    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)


class Song(models.Model):
    picture = models.ImageField(editable=True,blank=True, null=True)
    pic = models.URLField(max_length=200,blank=True, null=True)
    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    album = models.ForeignKey(Album,models.DO_NOTHING,blank=True, null=True)
    audio = models.FileField(blank=True, null=True)
    audioPath = models.CharField(max_length=200,blank=True, null=True)
    likes = models.IntegerField(default=0,blank=True,null=True,editable=True)
    dislikes = models.IntegerField(default=0, blank=True, null=True, editable=True)

    def save(self):
        print("custom save")
        if self.audio:
            self.audioPath="/media/"+str(self.audio)
        if self.picture :
            self.pic="/media/"+str(self.picture)
        else :
            self.pic='/static/default_song.png'
        super().save()


#'/static/default_song.png'
