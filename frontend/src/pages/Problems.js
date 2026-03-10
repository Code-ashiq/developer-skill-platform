import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function Problems() {

  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);

  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState("");

  const fetchProblems = async () => {

    const params = {};

    if (search) params.search = search;
    if (difficulty) params.difficulty = difficulty;

    const res = await API.get("/questions/", { params });

    setProblems(res.data);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (

    <MainLayout>

      <h1 className="text-2xl font-bold mb-6">
        Problem Library
      </h1>

      {/* Filters */}

      <div className="flex gap-4 mb-6">

        <input
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        >

          <option value="">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>

        </select>

        <button
          onClick={fetchProblems}
          className="bg-blue-600 px-4 rounded"
        >
          Filter
        </button>

      </div>

      {/* Problem Table */}

      <table className="w-full text-left">

        <thead>

          <tr className="border-b border-gray-700">

            <th>Title</th>
            <th>Difficulty</th>
            <th>Topic</th>

          </tr>

        </thead>

        <tbody>

          {problems.map(problem => (

            <tr
              key={problem.id}
              className="border-b border-gray-700 cursor-pointer hover:bg-gray-800"
              onClick={() => navigate(`/problems/${problem.id}`)}
            >

              <td>{problem.title}</td>

              <td
                className={
                  problem.difficulty === "easy"
                    ? "text-green-400"
                    : problem.difficulty === "medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {problem.difficulty}
              </td>

              <td>{problem.topic}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </MainLayout>
  );
}