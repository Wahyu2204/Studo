import Navbar from "../../components/dashboard/navbar";

export default function Selesaiikerjakan() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Tugas Selesai Dikerjakan
          </h1>
          <p className="text-center text-gray-600">
            Daftar tugas yang selesai dikerjakan akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </>
  );
}
