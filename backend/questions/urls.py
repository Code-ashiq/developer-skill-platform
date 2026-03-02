from django.urls import path
from .views import CreateQuestionView, DeleteQuestionView, QuestionListView
from .views import CreateTestCaseView, DeleteTestCaseView, QuestionDetailView
from .views import UpdateQuestionView

urlpatterns = [
    path('', QuestionListView.as_view(), name='question-list'),
    path('create/', CreateQuestionView.as_view(), name='question-create'),
    path("delete/<int:pk>/", DeleteQuestionView.as_view()),
    path("update/<int:pk>/", UpdateQuestionView.as_view()),
    path("testcase/create/", CreateTestCaseView.as_view()),
    path("testcase/delete/<int:pk>/", DeleteTestCaseView.as_view()),
    path("<int:pk>/", QuestionDetailView.as_view()),
]