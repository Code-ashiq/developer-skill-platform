import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <Card title="Total Problems" value="10" />
        <Card title="Accuracy" value="85%" />
        <Card title="Skill Level" value="Intermediate" />

      </div>

    </MainLayout>

  );

}

function Card({ title, value }) {

  return (

    <div className="bg-gray-800 p-6 rounded-lg">

      <h2 className="text-gray-400 mb-2">
        {title}
      </h2>

      <p className="text-2xl font-bold">
        {value}
      </p>

    </div>

  );

}