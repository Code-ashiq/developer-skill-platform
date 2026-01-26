from django.db import models

class Question(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    topic = models.CharField(max_length=100)
    test_cases = models.JSONField()  # stores input-output pairs
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title