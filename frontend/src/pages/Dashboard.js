import Navbar from "./components/Navbar";

export default function Dashboard() {

  return (

    <div className="min-h-screen bg-gray-900 text-white">

      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-gray-800 p-6 rounded">
            <h2 className="text-lg">Total Problems</h2>
            <p className="text-2xl font-bold">0</p>
          </div>

          <div className="bg-gray-800 p-6 rounded">
            <h2 className="text-lg">Accuracy</h2>
            <p className="text-2xl font-bold">0%</p>
          </div>

          <div className="bg-gray-800 p-6 rounded">
            <h2 className="text-lg">Skill Level</h2>
            <p className="text-2xl font-bold">Beginner</p>
          </div>

        </div>

      </div>

    </div>
  );
}