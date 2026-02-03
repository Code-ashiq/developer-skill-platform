from django.db import models
from users.models import User
from questions.models import Question

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    code = models.TextField()
    language = models.CharField(max_length=20, default="python")

    time_taken = models.FloatField(null=True, blank=True)
    is_correct = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.question.title}"
