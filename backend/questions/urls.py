from django.urls import path
from .views import CreateQuestionView, DeleteQuestionView, QuestionListView

urlpatterns = [
    path('', QuestionListView.as_view(), name='question-list'),
    path('create/', CreateQuestionView.as_view(), name='question-create'),
    path("delete/<int:pk>/", DeleteQuestionView.as_view()),
]