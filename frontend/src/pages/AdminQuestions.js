import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function AdminQuestions() {

  const [questions, setQuestions] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [topic, setTopic] = useState("");

  const fetchQuestions = async () => {

    const res = await API.get("/questions/");

    setQuestions(res.data);

  };

  useEffect(() => {

    fetchQuestions();

  }, []);

  const createQuestion = async () => {

    await API.post("/questions/create/", {
      title,
      description,
      difficulty,
      topic
    });

    fetchQuestions();

  };

  const deleteQuestion = async (id) => {

    await API.delete(`/questions/delete/${id}/`);

    fetchQuestions();

  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Admin Question Management
      </h1>


      {/* Create Form */}

      <div className="bg-gray-800 p-6 rounded mb-6">

        <input
          placeholder="Title"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Topic"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={(e) => setTopic(e.target.value)}
        />

        <select
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={createQuestion}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Create Question
        </button>

      </div>


      {/* Question List */}

      <div className="bg-gray-800 p-6 rounded">

        {questions.map(q => (

          <div
            key={q.id}
            className="flex justify-between border-b border-gray-700 p-2"
          >

            <div>
              {q.title} ({q.difficulty})
            </div>

            <button
              onClick={() => deleteQuestion(q.id)}
              className="text-red-400"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </MainLayout>

  );

}