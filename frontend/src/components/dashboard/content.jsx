import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MainContent() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [taskStats, setTaskStats] = useState({
    selesai: 0,
    sedangDikerjakan: 0,
    belumDikerjakan: 0,
    tidakDikerjakan: 0,
  });

  useEffect(() => {
    // Load task statistics from localStorage
    const stats = JSON.parse(localStorage.getItem("taskStats")) || {
      selesai: 0,
      sedangDikerjakan: 0,
      belumDikerjakan: 0,
      tidakDikerjakan: 0,
    };
    setTaskStats(stats);
  }, []);

  const navigate = useNavigate();

  // Tambahkan useEffect baru untuk menghitung ulang statistik
  useEffect(() => {
    const calculateTaskStats = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

      // Hitung jumlah tugas untuk setiap kategori
      const stats = {
        selesai: tasks.filter((task) => task.status === "Selesai").length,
        sedangDikerjakan: tasks.filter(
          (task) => task.status === "Sedang Dikerjakan"
        ).length,
        belumDikerjakan: tasks.filter(
          (task) => task.status === "Belum Dikerjakan"
        ).length,
        tidakDikerjakan: tasks.filter(
          (task) => task.status === "Tidak Dikerjakan"
        ).length,
      };

      // Update localStorage dan state
      localStorage.setItem("taskStats", JSON.stringify(stats));
      setTaskStats(stats);
    };

    // Panggil fungsi saat komponen dimuat
    calculateTaskStats();

    // Tambah event listener untuk update
    window.addEventListener("tasksUpdated", calculateTaskStats);

    // Cleanup
    return () => {
      window.removeEventListener("tasksUpdated", calculateTaskStats);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLogin(true);
        setIsLoading(true);

        try {
          const response = await fetch("${process.env.API_URL}/profile", {
            // Ganti dengan URL API Anda
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("Status API:", response.status);
          if (response.ok) {
            const user = await response.json();
            console.log("Data dari API:", user);
            setUsername(user.data.username || "Tamu"); // Ubah ke user.data.nama
          } else {
            setUsername("Tamu");
            if (response.status === 401) {
              localStorage.removeItem("token");
              setIsLogin(false);
              window.location.href = "/login";
            }
          }
        } catch (error) {
          console.error("Error saat fetch:", error);
          setUsername("Tamu");
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("Token tidak ditemukan");
      }
    };

    fetchUserData();
  }, []);

  // Add this function after the useEffect hook
  const calculatePercentage = (value) => {
    const total =
      taskStats.selesai +
      taskStats.sedangDikerjakan +
      taskStats.belumDikerjakan +
      taskStats.tidakDikerjakan;
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
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
                {/* <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  Dashboard
                </span> */}
              </div>
            </li>
          </ol>
        </nav>

        {/* Enhanced Welcome Section */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-12 shadow-lg mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-balance text-white sm:text-7xl">
            {isLogin
              ? isLoading
                ? "Memuat..."
                : `Selamat datang, ${username}`
              : "Sistem Manajemen Peminjaman Barang"}
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-indigo-100 sm:text-xl/8 max-w-2xl mx-auto">
            Selamat datang di Studo dimana anda bisa mengelola tugas anda dengan
            mudah.
          </p>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Enhanced Tugas Selesai Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Tugas Selesai
              </h3>
              <span className="p-2 bg-green-100 rounded-full">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-4xl font-bold text-green-800">
              {taskStats.selesai}
            </p>
            <div className="mt-4 h-2.5 w-full rounded-full bg-green-100 overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${calculatePercentage(taskStats.selesai)}%` }}
              ></div>
            </div>
            <button
              onClick={() => navigate("/tugas/selesaiDikerjakan")}
              className="mt-6 w-full px-4 py-2.5 text-sm font-medium text-green-700 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Lihat Detail
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Enhanced Sedang Dikerjakan Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Sedang Dikerjakan
              </h3>
              <span className="p-2 bg-blue-100 rounded-full">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-4xl font-bold text-blue-800">
              {taskStats.sedangDikerjakan}
            </p>
            <div className="mt-4 h-2.5 w-full rounded-full bg-blue-100 overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${calculatePercentage(taskStats.sedangDikerjakan)}%`,
                }}
              ></div>
            </div>
            <button
              onClick={() => navigate("/tugas/sedangDikerjakan")}
              className="mt-6 w-full px-4 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Lihat Detail
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Enhanced Tugas Belum Dikerjakan Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Belum Dikerjakan
              </h3>
              <span className="p-2 bg-yellow-100 rounded-full">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-4xl font-bold text-yellow-800">
              {taskStats.belumDikerjakan}
            </p>
            <div className="mt-4 h-2.5 w-full rounded-full bg-yellow-100 overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-yellow-500 transition-all duration-500"
                style={{
                  width: `${calculatePercentage(taskStats.belumDikerjakan)}%`,
                }}
              ></div>
            </div>
            <button
              onClick={() => navigate("/tugas/belumDikerjakan")}
              className="mt-6 w-full px-4 py-2.5 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Lihat Detail
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Enhanced Tugas Tidak Dikerjakan Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Tidak Dikerjakan
              </h3>
              <span className="p-2 bg-red-100 rounded-full">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-4xl font-bold text-red-800">
              {taskStats.tidakDikerjakan}
            </p>
            <div className="mt-4 h-2.5 w-full rounded-full bg-red-100 overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-red-500 transition-all duration-500"
                style={{
                  width: `${calculatePercentage(taskStats.tidakDikerjakan)}%`,
                }}
              ></div>
            </div>
            <button
              onClick={() => navigate("/tugas/tidakDikerjakan")}
              className="mt-6 w-full px-4 py-2.5 text-sm font-medium text-red-700 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Lihat Detail
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
