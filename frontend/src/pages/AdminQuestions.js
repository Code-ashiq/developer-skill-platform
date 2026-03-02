import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function AdminQuestions() {

  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [inputData, setInputData] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    topic: ""
  });

  const [editingId, setEditingId] = useState(null);

  const fetchQuestions = async () => {
    const res = await API.get("/questions/");
    setQuestions(res.data);
  };

  const fetchTestCases = async (questionId) => {

    const res = await API.get(`/questions/${questionId}/`);

    setTestCases(res.data.cases || []);

    setSelectedQuestion(questionId);
  };

  const createTestCase = async () => {

    await API.post("/questions/testcase/create/", {
      question: selectedQuestion,
      input_data: inputData,
      expected_output: expectedOutput,
      is_hidden: isHidden
    });

    setInputData("");
    setExpectedOutput("");
    setIsHidden(false);

    fetchTestCases(selectedQuestion);
  };

  const deleteTestCase = async (id) => {

    await API.delete(`/questions/testcase/delete/${id}/`);

    fetchTestCases(selectedQuestion);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    if (editingId) {

      await API.put(
        `/questions/update/${editingId}/`,
        form
      );

      setEditingId(null);

    } else {

      await API.post(
        "/questions/create/",
        form
      );

    }

    setForm({
      title: "",
      description: "",
      difficulty: "easy",
      topic: ""
    });

    fetchQuestions();
  };

  const handleEdit = (question) => {

    setEditingId(question.id);

    setForm({
      title: question.title,
      description: question.description,
      difficulty: question.difficulty,
      topic: question.topic
    });
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

      {/* Form */}
      <div className="bg-gray-800 p-6 rounded mb-6">

        <input
          name="title"
          value={form.title}
          placeholder="Title"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="topic"
          value={form.topic}
          placeholder="Topic"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={handleChange}
        />

        <select
          name="difficulty"
          value={form.difficulty}
          className="w-full p-2 mb-4 bg-gray-700"
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-green-600 px-4 py-2 rounded"
        >
          {editingId ? "Update Question" : "Create Question"}
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

            <div className="space-x-4">

            <button
              onClick={() => fetchTestCases(q.id)}
              className="text-yellow-400"
            >
              Manage Test Cases
            </button>

              <button
                onClick={() => handleEdit(q)}
                className="text-blue-400"
              >
                Edit
              </button>

              <button
                onClick={() => deleteQuestion(q.id)}
                className="text-red-400"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {selectedQuestion && (

        <div className="bg-gray-800 p-6 mt-6 rounded">

          <h2 className="text-xl font-bold mb-4">
            Test Cases
          </h2>

          <textarea
            placeholder="Input"
            className="w-full p-2 mb-2 bg-gray-700"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />

          <textarea
            placeholder="Expected Output"
            className="w-full p-2 mb-2 bg-gray-700"
            value={expectedOutput}
            onChange={(e) => setExpectedOutput(e.target.value)}
          />

          <label className="block mb-2">
            <input
              type="checkbox"
              checked={isHidden}
              onChange={() => setIsHidden(!isHidden)}
            />
            Hidden Test Case
          </label>

          <button
            onClick={createTestCase}
            className="bg-green-600 px-4 py-2 rounded mb-4"
          >
            Add Test Case
          </button>

          {testCases.map(tc => (

            <div
              key={tc.id}
              className="border-b border-gray-700 p-2 flex justify-between"
            >

              <div>
                <div>Input: {tc.input_data}</div>
                <div>Output: {tc.expected_output}</div>
                <div>{tc.is_hidden ? "Hidden" : "Visible"}</div>
              </div>

              <button
                onClick={() => deleteTestCase(tc.id)}
                className="text-red-400"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </MainLayout>

  );

}