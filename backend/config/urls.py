from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/questions/', include('questions.urls')),
    path('api/submissions/', include('submissions.urls')),
    path('api/analytics/', include('analytics.urls')),
]
