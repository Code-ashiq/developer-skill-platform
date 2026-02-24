import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function CodeEditor() {

  const { id } = useParams();

  const [question, setQuestion] = useState(null);

  const [code, setCode] = useState("# Write your Python code here\nprint(input())");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const fetchQuestion = async () => {

      try {

        const res = await API.get("/questions/");

        const q = res.data.find(q => q.id === parseInt(id));

        setQuestion(q);

      } catch (err) {

        console.error(err);

      }

    };

    fetchQuestion();

  }, [id]);


  const submitCode = async () => {

    setLoading(true);

    try {

      const res = await API.post("/submissions/submit/", {
        question_id: id,
        code: code
      });

      setResult(res.data);

    } catch (err) {

      console.error(err);

      alert("Submission failed");

    } finally {

      setLoading(false);

    }

  };


  if (!question) {

    return (
      <MainLayout>
        <div className="text-gray-400">Loading question...</div>
      </MainLayout>
    );

  }


  return (

    <MainLayout>

      <div className="grid grid-cols-2 gap-6 h-[75vh]">

        {/* Question Panel */}
        <div className="bg-gray-800 p-6 rounded-lg overflow-y-auto">

          <h1 className="text-2xl font-bold mb-4">
            {question.title}
          </h1>

          <span className={
            question.difficulty === "easy"
              ? "text-green-400"
              : question.difficulty === "medium"
              ? "text-yellow-400"
              : "text-red-400"
          }>
            {question.difficulty.toUpperCase()}
          </span>

          <p className="text-gray-400 mt-2 mb-4">
            Topic: {question.topic}
          </p>

          <div className="text-gray-200 whitespace-pre-wrap">
            {question.description}
          </div>

        </div>


        {/* Code Editor Panel */}
        <div className="flex flex-col">

          <div className="bg-gray-800 rounded-lg overflow-hidden">

            <Editor
              height="400px"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
            />

          </div>

          <button
            onClick={submitCode}
            disabled={loading}
            className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Running..." : "Submit Code"}
          </button>


          {/* Result Panel */}
          {result && (

            <div className="mt-4 bg-gray-800 p-4 rounded">

              <h2 className="font-bold mb-2">
                Result
              </h2>

              <p>
                Status:
                <span className={
                  result.is_correct
                    ? "text-green-400 ml-2"
                    : "text-red-400 ml-2"
                }>
                  {result.is_correct ? "Correct" : "Incorrect"}
                </span>
              </p>

              <p>
                Execution Time:
                <span className="ml-2">
                  {result.total_time.toFixed(4)} seconds
                </span>
              </p>

            </div>

          )}

        </div>

      </div>

    </MainLayout>

  );

}