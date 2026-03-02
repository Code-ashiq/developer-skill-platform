from rest_framework import serializers
from .models import Question, TestCase

class TestCaseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TestCase
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    
    cases = TestCaseSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = '__all__'
        

        
