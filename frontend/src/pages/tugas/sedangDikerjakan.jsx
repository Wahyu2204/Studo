import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/dashboard/navbar";
import { Link } from "react-router-dom";

export default function SedangDikerjakan() {
  const [tasks, setTasks] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showCompleteAlert, setShowCompleteAlert] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (taskId) => {
    navigate(`/editTugas/${taskId}`);
  };

  // Modify handleCompleteTask to show alert first
  const handleCompleteTask = (taskId) => {
    setSelectedTaskId(taskId);
    setShowCompleteAlert(true);
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const sedangDikerjakanTasks = savedTasks.filter(
      (task) => task.status === "Sedang Dikerjakan"
    );
    setTasks(sedangDikerjakanTasks);
  }, []);

  // Modify handleDelete to show alert first
  const handleDelete = (taskId) => {
    setSelectedTaskId(taskId);
    setShowDeleteAlert(true);
  };

  // Add actual delete function
  const confirmDelete = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = savedTasks.filter(
      (task) => task.id !== selectedTaskId
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Update task statistics
    let taskStats = JSON.parse(localStorage.getItem("taskStats") || "{}");
    taskStats.sedangDikerjakan = Math.max(
      0,
      (taskStats.sedangDikerjakan || 0) - 1
    );
    localStorage.setItem("taskStats", JSON.stringify(taskStats));

    // Update UI
    setTasks(tasks.filter((task) => task.id !== selectedTaskId));
    setShowDeleteAlert(false);
    window.dispatchEvent(new Event("tasksUpdated"));
  };

  // Add actual complete function
  const confirmComplete = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = savedTasks.map((task) =>
      task.id === selectedTaskId ? { ...task, status: "Selesai" } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Update task statistics
    let taskStats = JSON.parse(localStorage.getItem("taskStats") || "{}");
    taskStats.sedangDikerjakan = Math.max(
      0,
      (taskStats.sedangDikerjakan || 0) - 1
    );
    taskStats.selesai = (taskStats.selesai || 0) + 1;
    localStorage.setItem("taskStats", JSON.stringify(taskStats));

    // Update UI
    setTasks(tasks.filter((task) => task.id !== selectedTaskId));
    setShowCompleteAlert(false);
    window.dispatchEvent(new Event("tasksUpdated"));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <svg
                  className="w-3 h-3 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  Tugas Sedang Dikerjakan
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Tugas Sedang Dikerjakan
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {task.title}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Sedang Dikerjakan
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {task.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Deadline:</span>
                    <span className="font-medium text-blue-600">
                      {new Date(task.deadline).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                    <button
                      className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                      onClick={() => handleEdit(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      Selesai
                    </button>
                    <button
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                      onClick={() => handleDelete(task.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                Tidak ada tugas yang sedang dikerjakan
              </div>
            )}
          </div>

          {/* Delete Alert */}
          {showDeleteAlert && (
            <>
              <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"></div>
              <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white border border-red-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Hapus Tugas
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus tugas ini?
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setShowDeleteAlert(false)}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                    >
                      Batal
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Complete Task Alert */}
          {showCompleteAlert && (
            <>
              <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"></div>
              <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white border border-green-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Selesaikan Tugas
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Apakah Anda yakin telah menyelesaikan tugas ini?
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setShowCompleteAlert(false)}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                    >
                      Batal
                    </button>
                    <button
                      onClick={confirmComplete}
                      className="px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded"
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
