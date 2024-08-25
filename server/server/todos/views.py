from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer


class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = Todo.objects.all()
        # Use GET to access query parameters
        channel_id = self.request.GET.get('channel_id', None)
        if channel_id is not None:
            queryset = queryset.filter(channel_id=channel_id)
        return queryset


class TodoUpdateCreate(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def put(self, request, *args, **kwargs):
        todo, created = Todo.objects.update_or_create(
            title=request.data.get('title'),
            channel_id=request.data.get('channel_id'),
            guild_id=request.data.get('guild_id'),
            defaults={
                'added_by_id': request.data.get('added_by_id'),
                'added_by_username': request.data.get('added_by_username'),
            }
        )
        if created:
            return JsonResponse({'message': 'To-Do created successfully'}, status=201)
        else:
            return JsonResponse({'message': 'To-Do updated successfully'}, status=200)


class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class TodoUpdate(generics.UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def patch(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_completed = request.data.get('is_completed')
        todo.save()
        return JsonResponse({'message': 'To-Do updated successfully'}, status=200)


class TodoDeleteByChannel(generics.DestroyAPIView):
    def delete(self, request, *args, **kwargs):
        channel_id = request.query_params.get('channel_id')
        if channel_id:
            deleted_count, _ = Todo.objects.filter(
                channel_id=channel_id).delete()
            return JsonResponse({'message': f'{deleted_count} To-Do(s) deleted successfully'}, status=200)
        return JsonResponse({'error': 'channel_id parameter is required'}, status=400)
