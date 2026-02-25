import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function Submissions() {

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchSubmissions = async () => {

      try {

        const res = await API.get("/submissions/my/");

        setSubmissions(res.data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchSubmissions();

  }, []);


  if (loading) {

    return (
      <MainLayout>
        <div className="text-gray-400">Loading submissions...</div>
      </MainLayout>
    );

  }


  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Submission History
      </h1>

      <div className="bg-gray-800 rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-700">

            <tr>

              <th className="text-left p-4">Question</th>

              <th className="text-left p-4">Status</th>

              <th className="text-left p-4">Execution Time</th>

              <th className="text-left p-4">Date</th>

            </tr>

          </thead>

          <tbody>

            {submissions.map((sub) => (

              <tr
                key={sub.id}
                className="border-b border-gray-700"
              >

                <td className="p-4">
                  {sub.question_title}
                </td>

                <td className="p-4">

                  <span className={
                    sub.is_correct
                      ? "text-green-400"
                      : "text-red-400"
                  }>
                    {sub.is_correct ? "Correct" : "Incorrect"}
                  </span>

                </td>

                <td className="p-4">
                  {sub.time_taken.toFixed(4)} s
                </td>

                <td className="p-4 text-gray-400">
                  {new Date(sub.created_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>

  );

}