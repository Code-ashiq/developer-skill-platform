from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Submission
from .serializers import SubmissionSerializer
from questions.models import Question
from .utils import run_python_code

class SubmitCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        question_id = request.data.get("question_id")
        code = request.data.get("code")

        question = Question.objects.get(id=question_id)

        all_passed = True
        total_time = 0

        for case in question.test_cases:
            result = run_python_code(code, case["input"])

            if result["output"] != case["output"]:
                all_passed = False

            total_time += result["time"]

        submission = Submission.objects.create(
            user=user,
            question=question,
            code=code,
            time_taken=total_time,
            is_correct=all_passed
        )

        return Response({
            "is_correct": all_passed,
            "time_taken": total_time
        })