import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import AnalyticsChart from "../components/AnalyticsChart";

export default function Dashboard() {

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


  if (!data) {

    return (
      <MainLayout>
        <div className="text-gray-400">Loading dashboard...</div>
      </MainLayout>
    );

  }


  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <Card
          title="Total Submissions"
          value={data.total_submissions}
        />

        <Card
          title="Accuracy"
          value={(data.accuracy * 100).toFixed(1) + "%"}
        />

        <Card
          title="Skill Level"
          value={data.skill_level}
        />

        <Card
          title="Skill Score"
          value={data.skill_score}
        />

        <Card
          title="Correct Submissions"
          value={data.total_correct}
        />

        <Card
          title="Avg Execution Time"
          value={data.avg_execution_time.toFixed(4) + " s"}
        />

      </div>

      <div className="mt-8">

        <AnalyticsChart analytics={data} />

      </div>

    </MainLayout>

  );

}


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