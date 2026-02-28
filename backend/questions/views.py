from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from .models import Question
from .serializers import QuestionSerializer
from rest_framework import status

class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class CreateQuestionView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):

        serializer = QuestionSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=400)
    
class DeleteQuestionView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, pk):

        try:

            question = Question.objects.get(pk=pk)

            question.delete()

            return Response({"message": "Deleted"})

        except Question.DoesNotExist:

            return Response(
                {"error": "Not found"},
                status=status.HTTP_404_NOT_FOUND
            )
            
class UpdateQuestionView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, pk):

        try:
            question = Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            return Response(
                {"error": "Question not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = QuestionSerializer(
            question,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)