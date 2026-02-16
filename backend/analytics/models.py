from django.db import models
from users.models import User


class UserAnalytics(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    total_submissions = models.IntegerField(default=0)

    total_correct = models.IntegerField(default=0)

    accuracy = models.FloatField(default=0)

    avg_execution_time = models.FloatField(default=0)

    skill_score = models.FloatField(default=0)

    skill_level = models.CharField(max_length=20, default="Beginner")

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} analytics"
