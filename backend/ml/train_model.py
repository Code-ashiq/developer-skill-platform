import os
import django
import sys

# Setup Django environment
sys.path.append("../backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from analytics.models import UserAnalytics

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib


def generate_dataset():

    data = []

    analytics = UserAnalytics.objects.all()

    for a in analytics:

        data.append({
            "total_submissions": a.total_submissions,
            "accuracy": a.accuracy,
            "avg_execution_time": a.avg_execution_time,
            "skill_score": a.skill_score,
            "skill_level": a.skill_level
        })

    return pd.DataFrame(data)


def train():

    df = generate_dataset()

    if len(df) < 5:
        print("Not enough data to train model")
        return

    X = df[[
        "total_submissions",
        "accuracy",
        "avg_execution_time",
        "skill_score"
    ]]

    y = df["skill_level"]

    model = RandomForestClassifier()

    model.fit(X, y)

    joblib.dump(model, "model.pkl")

    print("Model trained and saved")


if __name__ == "__main__":
    train()