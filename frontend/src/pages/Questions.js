import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function Questions() {

  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        const res = await API.get("/questions/");

        setQuestions(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchQuestions();

  }, []);

  const difficultyColor = (difficulty) => {

    if (difficulty === "easy")
      return "text-green-400";

    if (difficulty === "medium")
      return "text-yellow-400";

    if (difficulty === "hard")
      return "text-red-400";

    return "text-gray-400";
  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Questions
      </h1>

        <div className="bg-gray-800 rounded-lg">

          {questions.map((q) => (

            <div
              key={q.id}
              onClick={() => navigate(`/questions/${q.id}`)}
              className="border-b border-gray-700 p-4 hover:bg-gray-700 cursor-pointer flex justify-between"
            >

              <div>

                <h2 className="text-lg font-semibold">
                  {q.title}
                </h2>

                <p className="text-gray-400 text-sm">
                  {q.topic}
                </p>

              </div>

              <span className={difficultyColor(q.difficulty)}>
                {q.difficulty.toUpperCase()}
              </span>

            </div>

          ))}

        </div>
    </MainLayout>
  );
}