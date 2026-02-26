import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function AnalyticsChart({ analytics }) {

  const data = [
    {
      name: "Total",
      value: analytics.total_submissions
    },
    {
      name: "Correct",
      value: analytics.total_correct
    },
    {
      name: "Accuracy %",
      value: (analytics.accuracy * 100).toFixed(1)
    },
    {
      name: "Skill Score",
      value: analytics.skill_score
    }
  ];

  return (

    <div className="bg-gray-800 p-6 rounded-lg">

      <h2 className="text-xl font-bold mb-4">
        Performance Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid stroke="#444" />

          <XAxis dataKey="name" stroke="#aaa" />

          <YAxis stroke="#aaa" />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}