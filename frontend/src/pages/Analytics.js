import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Analytics() {

  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const res = await API.get("/analytics/me/");

        setData(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchAnalytics();

  }, []);

  if (!data) return null;

  return (

    <div className="min-h-screen bg-gray-900 text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-6">
          Analytics Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <Card title="Total Submissions" value={data.total_submissions} />

          <Card title="Correct Submissions" value={data.total_correct} />

          <Card title="Accuracy"
                value={(data.accuracy * 100).toFixed(1) + "%"} />

          <Card title="Avg Execution Time"
                value={data.avg_execution_time.toFixed(4) + "s"} />

          <Card title="Skill Score" value={data.skill_score} />

          <Card title="Skill Level" value={data.skill_level} />

        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded">

          <h2 className="text-xl font-bold mb-2">
            ML Prediction
          </h2>

          <p className="text-green-400 text-lg">
            {data.ml_prediction}
          </p>

        </div>

      </div>

    </div>
  );
}

function Card({ title, value }) {

  return (

    <div className="bg-gray-800 p-6 rounded">

      <h2 className="text-gray-400 mb-2">
        {title}
      </h2>

      <p className="text-2xl font-bold">
        {value}
      </p>

    </div>

  );
}