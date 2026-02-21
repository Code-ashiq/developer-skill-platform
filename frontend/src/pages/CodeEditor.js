import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {

  const { id } = useParams();

  const [question, setQuestion] = useState(null);

  const [code, setCode] = useState("print(input())");

  const [result, setResult] = useState(null);

  useEffect(() => {

    const fetchQuestion = async () => {

      const res = await API.get("/questions/");

      const q = res.data.find(q => q.id === parseInt(id));

      setQuestion(q);
    };

    fetchQuestion();

  }, [id]);

  const submitCode = async () => {

    try {

      const res = await API.post("/submissions/submit/", {
        question_id: id,
        code
      });

      setResult(res.data);

    } catch (err) {

      alert("Submission failed");

    }

  };

  if (!question) return null;

  return (

    <div className="min-h-screen bg-gray-900 text-white">

      <Navbar />

      <div className="grid grid-cols-2 gap-4 p-6">

        {/* Question */}
        <div className="bg-gray-800 p-6 rounded">

          <h1 className="text-2xl font-bold mb-4">
            {question.title}
          </h1>

          <p className="text-gray-300">
            {question.description}
          </p>

        </div>

        {/* Editor */}
        <div className="bg-gray-800 p-4 rounded">

          <Editor
            height="400px"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />

          <button
            onClick={submitCode}
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Submit
          </button>

          {result && (

            <div className="mt-4 bg-gray-900 p-4 rounded">

              <p>
                Result:
                <span className={
                  result.is_correct
                    ? "text-green-400"
                    : "text-red-400"
                }>
                  {result.is_correct ? " Correct" : " Incorrect"}
                </span>
              </p>

              <p>
                Execution Time: {result.total_time.toFixed(4)}s
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}