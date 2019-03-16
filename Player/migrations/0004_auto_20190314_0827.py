# Generated by Django 2.1.7 on 2019-03-14 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Player', '0003_auto_20190311_1819'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='pic',
            field=models.ImageField(blank=True, default='/static/default_album.jpg', null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='song',
            name='audioPath',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='pic',
            field=models.ImageField(blank=True, default='/static/default_song.png', null=True, upload_to=''),
        ),
    ]