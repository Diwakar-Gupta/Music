# Generated by Django 2.1.7 on 2019-03-16 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Player', '0004_auto_20190314_0827'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='dislikes',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='song',
            name='likes',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]