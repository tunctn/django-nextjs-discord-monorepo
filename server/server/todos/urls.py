from django.urls import path
from . import views

urlpatterns = [
    # GET /api/to-dos/?channel_id=<channel_id>
    path('to-dos/', views.TodoListCreate.as_view(), name='todo-list-create'),

    # PUT /api/to-dos/
    path('to-dos/', views.TodoUpdateCreate.as_view(), name='todo-update-create'),

    # DELETE /api/to-dos/<int:pk>/
    path('to-dos/<int:pk>/', views.TodoDetail.as_view(), name='todo-detail'),

    # UPDATE /api/to-dos/<int:pk>/
    path('to-dos/<int:pk>/', views.TodoUpdate.as_view(), name='todo-update'),

    # DELETE /api/to-dos/?channel_id=<channel_id>
    path('to-dos/delete/', views.TodoDeleteByChannel.as_view(),
         name='todo-delete-by-channel'),
]
