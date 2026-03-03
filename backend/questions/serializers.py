from rest_framework import serializers
from .models import Question, TestCase

class TestCaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = TestCase
        fields = "__all__"

    def validate(self, data):

        if not data.get("input_data"):
            raise serializers.ValidationError("Input data is required.")

        if not data.get("expected_output"):
            raise serializers.ValidationError("Expected output is required.")

        return data

class QuestionSerializer(serializers.ModelSerializer):

    cases = TestCaseSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = "__all__"

    def validate(self, data):

        if not data.get("title"):
            raise serializers.ValidationError("Title is required.")

        if not data.get("description"):
            raise serializers.ValidationError("Description is required.")

        if not data.get("topic"):
            raise serializers.ValidationError("Topic is required.")

        return data
        

        
