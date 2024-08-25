from django.http import JsonResponse
from django.views.decorators.http import require_GET


@require_GET  # Only allow GET requests
def api_status(request):
    return JsonResponse({'status': 'ok', 'api': 'django-server-rest'})
