from submissions.models import Submission
from .models import UserAnalytics


def update_user_analytics(user):

    submissions = Submission.objects.filter(user=user)

    total = submissions.count()

    correct = submissions.filter(is_correct=True).count()

    accuracy = (correct / total) if total > 0 else 0

    avg_time = (
        sum(s.time_taken for s in submissions) / total
        if total > 0 else 0
    )

    # Skill score formula
    skill_score = (accuracy * 0.7) + (min(total / 50, 1) * 0.3)

    # Skill level classification
    if skill_score < 0.4:
        level = "Beginner"
    elif skill_score < 0.7:
        level = "Intermediate"
    else:
        level = "Advanced"

    analytics, created = UserAnalytics.objects.get_or_create(user=user)

    analytics.total_submissions = total
    analytics.total_correct = correct
    analytics.accuracy = accuracy
    analytics.avg_execution_time = avg_time
    analytics.skill_score = skill_score
    analytics.skill_level = level

    analytics.save()

    return analytics