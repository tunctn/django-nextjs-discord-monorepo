from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)

    guild_id = models.CharField(max_length=255)
    channel_id = models.CharField(max_length=255)

    added_by_id = models.CharField(max_length=255)
    added_by_username = models.CharField(max_length=255)

    def __str__(self):
        return self.title
