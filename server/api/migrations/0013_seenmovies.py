# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-19 19:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_collections_movies'),
    ]

    operations = [
        migrations.CreateModel(
            name='SeenMovies',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seen', models.BooleanField(default=0)),
                ('collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Collections')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Movies')),
            ],
        ),
    ]
