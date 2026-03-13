from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from .models import Question, TestCase
from .serializers import QuestionSerializer, TestCaseSerializer
from submissions.models import Submission
from rest_framework import status

class QuestionListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        difficulty = request.query_params.get("difficulty")
        topic = request.query_params.get("topic")
        search = request.query_params.get("search")
        page = int(request.query_params.get("page", 1))

        limit = 10
        start = (page - 1) * limit
        end = start + limit

        questions = Question.objects.all()

        if difficulty:
            questions = questions.filter(difficulty=difficulty)

        if topic:
            questions = questions.filter(topic__icontains=topic)

        if search:
            questions = questions.filter(title__icontains=search)

        questions = questions[start:end]

        data = []

        for q in questions:

            solved = Submission.objects.filter(
                user=request.user,
                question=q,
                is_correct=True
            ).exists()

            data.append({
                "id": q.id,
                "title": q.title,
                "difficulty": q.difficulty,
                "topic": q.topic,
                "solved": solved
            })

        return Response(data)


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
    
class CreateTestCaseView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):

        serializer = TestCaseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


class DeleteTestCaseView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, pk):

        try:
            test_case = TestCase.objects.get(pk=pk)
            test_case.delete()
            return Response({"message": "Deleted"})
        except TestCase.DoesNotExist:
            return Response({"error": "Not found"}, status=404)
        
class QuestionDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            question = Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = QuestionSerializer(question)

        return Response(serializer.data)