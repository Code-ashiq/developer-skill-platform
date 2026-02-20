from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import UserAnalytics

import sys
import os

# Add ML folder to path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../ml"))

from predict import predict_skill


class MyAnalyticsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:
            analytics = UserAnalytics.objects.get(user=request.user)

            predicted = predict_skill(analytics)

            return Response({
                "total_submissions": analytics.total_submissions,
                "total_correct": analytics.total_correct,
                "accuracy": analytics.accuracy,
                "avg_execution_time": analytics.avg_execution_time,
                "skill_score": analytics.skill_score,
                "skill_level": analytics.skill_level,
                "ml_prediction": predicted
            })

        except UserAnalytics.DoesNotExist:

            return Response({
                "message": "No analytics yet"
            })