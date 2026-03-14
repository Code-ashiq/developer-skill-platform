import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function Problems() {

  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);

  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState("");

  const [page, setPage] = useState(1);

  const fetchProblems = useCallback (async () => {

    const params = {};

    if (search) params.search = search;
    if (difficulty) params.difficulty = difficulty;

    const res = await API.get("/questions/", { 
      params: { search, difficulty, page} 
    });

    setProblems(res.data);
  }, [search, difficulty, page]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  return (

    <MainLayout>

      <h1 className="text-2xl font-bold mb-6">
        Problem Library
      </h1>

      <p className="text-gray-400 mb-6">
        {problems.length} problems available
      </p>

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

      <table className="w-full text-left border-seperate border-spacing-y-2">

        <thead>

          <tr className="text-grey-400 text-sm">
            <th className="w-10"></th>
            <th className="py-2">Title</th>
            <th className="py-2">Difficulty</th>
            <th className="py-2">Topic</th>

          </tr>

        </thead>

        <tbody>

          {problems.map((problem, index) => (

            <tr
              key={problem.id}
              className={`cursor-pointer hover:bg-gray-700 transition ${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
              }`}
              onClick={() => navigate(`/problems/${problem.id}`)}
            >

              <td className="px-4 py-3 text-green-400 font-bold">
                {problem.solved ? "✔" : ""}
              </td>

              <td className="px-4 py-3 font-medium">
                
                {problem.title}
              </td>

              <td
                className={`px-4 py-3 font-semibold ${
                  problem.difficulty === "easy"
                    ? "text-green-400"
                    : problem.difficulty === "medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {problem.difficulty}
              </td>

              <td className="px-4 py-3 text-gray-400">
                {problem.topic}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex gap-4 mt-6">

      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        className="bg-gray-700 px-4 py-2 rounded"
      >
        Previous
      </button>

      <button
        onClick={() => setPage(p => p + 1)}
        className="bg-gray-700 px-4 py-2 rounded"
      >
        Next
      </button>

      </div>

    </MainLayout>
  );
}