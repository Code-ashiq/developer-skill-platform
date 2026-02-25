from rest_framework import serializers
from .models import Submission


class SubmissionSerializer(serializers.ModelSerializer):

    question_title = serializers.CharField(source="question.title")

    class Meta:

        model = Submission

        fields = [
            "id",
            "question_title",
            "is_correct",
            "time_taken",
            "created_at"
        ]