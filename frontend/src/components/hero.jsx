import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />

      <div className="relative isolate px-6 lg:px-8">
        {/* Decorative blur effect */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            {/* Enhanced badge */}
            <div className="mb-8 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-600/20 backdrop-blur-sm">
              <span className="mr-2">✨</span>
              <span>Kelola tugas Anda dengan lebih efisien</span>
            </div>

            {/* Enhanced heading */}
            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Studo
              </span>
            </h1>

            {/* Enhanced description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Platform manajemen tugas yang membantu Anda tetap terorganisir,
              fokus, dan produktif dalam menyelesaikan setiap tugas akademik
              Anda.
            </p>

            {/* Enhanced CTA buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
              >
                Mulai Sekarang
              </Link>
              <Link
                to="/about"
                className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
              >
                Pelajari Lebih Lanjut
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </div>

            {/* Feature highlights */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-24">
              {[
                {
                  title: "Mudah Digunakan",
                  description: "Interface yang intuitif dan ramah pengguna",
                  icon: "🎯",
                },
                {
                  title: "Terorganisir",
                  description: "Kelola tugas dengan lebih terstruktur",
                  icon: "📋",
                },
                {
                  title: "Progress Tracking",
                  description: "Pantau perkembangan tugas Anda",
                  icon: "📈",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm"
                >
                  <div className="mb-3 text-2xl">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
