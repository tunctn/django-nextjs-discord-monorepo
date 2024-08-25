import os
import requests
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


@csrf_exempt  # To exempt this view from CSRF verification
@require_POST  # Only allow POST requests
def get_discord_token(request):

    # Check if content type is JSON
    if request.content_type == 'application/json':
        data = json.loads(request.body)
        code = data.get('code')
    else:
        # Assume form-encoded data
        code = request.POST.get('code')

    # Exchange the code for an access_token
    response = requests.post(
        'https://discord.com/api/oauth2/token',
        headers={
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data={
            'client_id': os.getenv('DISCORD_CLIENT_ID'),
            'client_secret': os.getenv('DISCORD_CLIENT_SECRET'),
            'grant_type': 'authorization_code',
            'code': code,
        }
    )

    # Parse the response JSON
    response_data = response.json()

    # Retrieve the access_token from the response
    access_token = response_data.get('access_token')

    # Return the access_token to the client
    return JsonResponse({'access_token': access_token})
