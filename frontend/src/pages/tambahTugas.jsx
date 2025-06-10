import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/navbar";
import { Link } from "react-router-dom";

export default function TambahTugas() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi tanggal deadline
    if (!deadline) {
      alert("Tanggal deadline harus diisi!");
      return;
    }

    // Simulasi penyimpanan tugas di localStorage
    const newTask = {
      id: Date.now(), // ID unik berdasarkan timestamp
      title,
      description,
      status: "Belum Dikerjakan", // Default status
      deadline, // Tanggal deadline
      createdAt: new Date().toISOString(),
    };

    // Update statistik tugas
    let taskStats = JSON.parse(
      localStorage.getItem("taskStats") ||
        JSON.stringify({
          selesai: 0,
          sedangDikerjakan: 0,
          belumDikerjakan: 0,
          tidakDikerjakan: 0,
        })
    );

    taskStats.belumDikerjakan += 1;
    localStorage.setItem("taskStats", JSON.stringify(taskStats));

    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    console.log("Tugas disimpan:", newTask);
    // Kembali ke dashboard setelah menyimpan
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
                  Tambah Tugas
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Enhanced Form Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-blue-500">
            <h1 className="text-3xl font-bold text-white text-center">
              Tambah Tugas Baru
            </h1>
            <p className="mt-2 text-center text-indigo-100">
              Isi detail tugas yang akan dikerjakan
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Judul Tugas */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-900 flex items-center gap-1"
              >
                Judul Tugas
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                placeholder="Contoh: Membuat Presentasi Marketing"
                required
              />
            </div>

            {/* Deskripsi Tugas */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-900"
              >
                Deskripsi Tugas
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                placeholder="Jelaskan detail tugas yang perlu dikerjakan..."
              />
            </div>

            {/* Tanggal Deadline */}
            <div className="space-y-2">
              <label
                htmlFor="deadline"
                className="text-sm font-medium text-gray-900 flex items-center gap-1"
              >
                Tanggal Deadline
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                required
              />
              <p className="text-sm text-gray-500">
                Pilih tanggal deadline untuk tugas ini
              </p>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Simpan Tugas
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
