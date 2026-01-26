from django.urls import path
from .views import QuestionListView, QuestionCreateView

urlpatterns = [
    path('', QuestionListView.as_view(), name='question-list'),
    path('create/', QuestionCreateView.as_view(), name='question-create'),
]