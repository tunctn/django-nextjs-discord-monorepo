# Generated by Django 5.1 on 2024-08-23 18:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_remove_todo_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='completed',
            new_name='is_completed',
        ),
    ]
