import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function CodeEditor() {

  const { id } = useParams();

  const [question, setQuestion] = useState(null);

  const [code, setCode] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const fetchQuestion = async () => {

      try {

        const res = await API.get(`/questions/${id}/`);

        setQuestion(res.data);

        setCode(res.data.starter_code || "");

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

      <div className="grid grid-cols-2 gap-6 min-h-[75vh]">

        {/* Question Panel */}
        
        <div className="bg-gray-800 p-6 rounded-lg overflow-y-auto">

          <h1 className="text-2xl font-bold mb-2">
            {question.title}
          </h1>

          <span
            className={
              question.difficulty === "easy"
                ? "text-green-400"
                : question.difficulty === "medium"
                ? "text-yellow-400"
                : "text-red-400"
            }
          >
            {question.difficulty.toUpperCase()}
          </span>

          <p className="text-gray-400 mt-2 mb-4">
            Topic: {question.topic}
          </p>

          {/* Description */}
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-gray-300 whitespace-pre-wrap">
              {question.description}
            </p>
          </div>

          {/* Constraints */}
          {question.constraints && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Constraints</h3>
              <p className="text-gray-300 whitespace-pre-wrap">
                {question.constraints}
              </p>
            </div>
          )}

          {/* Examples */}
          {question.examples && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Examples</h3>
              <pre className="bg-gray-900 p-3 rounded text-sm text-gray-300 whitespace-pre-wrap">
                {question.examples}
              </pre>
            </div>
          )}

        </div>

        {/* Code Editor Panel */}
        <div className="flex flex-col overflow-y-auto">

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

            <div className="mt-6 bg-gray-800 p-4 rounded">

              <h2 className="text-xl font-bold mb-3">
                Submission Result
              </h2>

              <p className="mb-3">
                Status: 
                <span className={result.is_correct ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
                  {result.is_correct ? "Accepted" : "Failed"}
                </span>
              </p>

              <p className="mb-4">
                Execution Time: {result.total_time.toFixed(4)} seconds
              </p>

              <h3 className="text-lg mb-2">Test Cases</h3>

              <div className="space-y-3">

                {result.test_results.map((tc, index) => (

                  <div
                    key={index}
                    className="bg-gray-700 p-3 rounded"
                  >

                    <p>
                      <strong>Input:</strong> {tc.input}
                    </p>

                    <p>
                      <strong>Expected:</strong> {tc.expected}
                    </p>

                    <p>
                      <strong>Output:</strong> {tc.actual}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={tc.passed ? "text-green-400" : "text-red-400"}>
                        {tc.passed ? "Passed" : "Failed"}
                      </span>
                    </p>

                    {tc.error && (
                      <p className="text-red-400">
                        Error: {tc.error}
                      </p>
                    )}

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>

    </MainLayout>

  );

}