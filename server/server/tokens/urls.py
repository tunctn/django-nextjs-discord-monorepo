from django.urls import path
from .views import get_discord_token

urlpatterns = [
    path('token/', get_discord_token, name='get_discord_token'),
]
