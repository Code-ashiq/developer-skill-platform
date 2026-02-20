import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

model = None

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)


def predict_skill(analytics):

    if model is None:
        return analytics.skill_level

    X = [[
        analytics.total_submissions,
        analytics.accuracy,
        analytics.avg_execution_time,
        analytics.skill_score
    ]]

    prediction = model.predict(X)

    return prediction[0]