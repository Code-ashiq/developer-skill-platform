import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function Analytics() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const res = await API.get("/analytics/me/");

        setData({
          total_submissions: res.data.total_submissions ?? 0,
          total_correct: res.data.total_correct ?? 0,
          accuracy: res.data.accuracy ?? 0,
          skill_score: res.data.skill_score ?? 0,
          skill_level: res.data.skill_level ?? "Beginner",
          avg_execution_time: res.data.avg_execution_time ?? 0
        });

      } catch (err) {

        console.error("Analytics fetch error:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchAnalytics();

  }, []);

  if (loading) {

    return (
      <MainLayout>
        <div className="text-gray-400">Loading analytics...</div>
      </MainLayout>
    );

  }

  if (!data) {

    return (
      <MainLayout>
        <div className="text-red-400">Failed to load analytics.</div>
      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Card
          title="Total Submissions"
          value={data.total_submissions}
        />

        <Card
          title="Correct Submissions"
          value={data.total_correct}
        />

        <Card
          title="Accuracy"
          value={((data.accuracy ?? 0) * 100).toFixed(2)}
        />

        <Card
          title="Avg Execution Time"
          value={(data.avg_execution_time ?? 0).toFixed(4)}
        />

        <Card
          title="Skill Score"
          value={data.skill_score}
        />

        <Card
          title="Skill Level"
          value={data.skill_level}
        />

      </div>

      {/* ML Prediction Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg">

        <h2 className="text-xl font-bold mb-2">
          ML Prediction
        </h2>

        <p className="text-green-400 text-lg font-semibold">
          {data.ml_prediction}
        </p>

        <p className="text-gray-400 text-sm mt-2">
          Based on your submission history, accuracy, and execution performance.
        </p>

      </div>

    </MainLayout>

  );

}


/* Card Component */

function Card({ title, value }) {

  return (

    <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition">

      <h3 className="text-gray-400 mb-2 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold">
        {value}
      </p>

    </div>

  );

}