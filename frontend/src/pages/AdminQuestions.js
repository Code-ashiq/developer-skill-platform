import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";

export default function AdminQuestions() {

  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [inputData, setInputData] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (!inputData || !expectedOutput) {
      toast.error("Input and Expected Output are required.");
      return;
    }

    try {

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

    } catch (error) {

      toast.error("Failed to create test case.");

    }
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

    if (!form.title || !form.description || !form.topic) {
      toast.error("All fields are required.");
      return;
    }

    try {

      setLoading(true);

      if (editingId) {

        await API.put(
          `/questions/update/${editingId}/`,
          form
        );

        toast.success("Question updated");

        setEditingId(null);

      } else {

        await API.post(
          "/questions/create/", {
            title: form.title,
            description: form.description,
            difficulty: form.difficulty,
            topic: form.topic
          }
        );

        toast.success("Question created");

    }

    setForm({
      title: "",
      description: "",
      difficulty: "easy",
      topic: ""
    });

    fetchQuestions();

  } catch (error) {

      console.log(error.response?.data);

      toast.error(
        error.response?.data?.detail ||
        "Failed to save question"
      );

  } finally {

    setLoading(false);

  }
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
          disabled={loading}
          className="bg-green-600 px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Question"}
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

          <table className="w-full text-left">

            <thead>

              <tr className="border-b border-gray-700">

                <th>Input</th>
                <th>Expected Output</th>
                <th>Hidden</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {testCases.map(tc => (

                <tr key={tc.id} className="border-b border-gray-700">

                  <td>{tc.input_data}</td>

                  <td>{tc.expected_output}</td>

                  <td>{tc.is_hidden ? "Yes" : "No"}</td>

                  <td>

                    <button
                      onClick={() => deleteTestCase(tc.id)}
                      className="text-red-400"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </MainLayout>

  );

}