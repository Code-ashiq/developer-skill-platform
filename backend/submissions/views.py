from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Submission
from questions.models import Question
from .utils import run_python_code
from analytics.utils import update_user_analytics
from .serializers import SubmissionSerializer
from questions.models import Question, TestCase


class SubmitCodeView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        question_id = request.data.get("question_id")
        code = request.data.get("code")

        if not question_id or not code:
            return Response({"error": "question_id and code required"}, status=400)

        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({"error": "Question not found"}, status=404)

        all_passed = True
        total_time = 0
        results = []

        # Get test cases from database
        test_cases = TestCase.objects.filter(question=question)
        
        for case in test_cases:

            result = run_python_code(code, case.input_data)

            passed = result["output"] == case.expected_output

            if not passed:
                all_passed = False

            total_time += result["execution_time"]

            results.append({
                "input": case.input_data,
                "expected": case.expected_output,
                "actual": result["output"],
                "passed": passed,
                "error": result["error"]
            })

        # Save submission
        submission = Submission.objects.create(
            user=user,
            question=question,
            code=code,
            time_taken=total_time,
            is_correct=all_passed
        )
        
        # Update analytics
        analytics = update_user_analytics(user)

        return Response({
            "submission_id": submission.id,
            "is_correct": all_passed,
            "total_time": total_time,
            "test_results": results
        })
        
class MySubmissionsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        submissions = Submission.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = SubmissionSerializer(submissions, many=True)

        return Response(serializer.data)