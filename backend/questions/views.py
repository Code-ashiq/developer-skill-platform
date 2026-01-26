from rest_framework import generics, permissions
from .models import Question
from .serializers import QuestionSerializer

class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionCreateView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAdminUser]