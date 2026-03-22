from django.urls import path
from .views import SubmitCodeView, MySubmissionsView, RunCodeView

urlpatterns = [
    path('submit/', SubmitCodeView.as_view(), name='submit-code'),
    path("my/", MySubmissionsView.as_view()),
    path("run/", RunCodeView.as_view()),
]