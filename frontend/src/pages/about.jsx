import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="flex-grow relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50">
        {/* Enhanced Background Effect */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[-5%] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative z-10">
          {/* Enhanced Header Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-8 text-sm font-medium rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-600/20">
              ✨ Our Story
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              About Studo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Platform manajemen tugas yang membantu Anda tetap terorganisir,
              fokus, dan produktif dalam menyelesaikan setiap tugas akademik.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Mudah Digunakan",
                description:
                  "Interface yang intuitif dan ramah pengguna untuk memudahkan pengelolaan tugas Anda",
                icon: "🎯",
              },
              {
                title: "Progress Tracking",
                description:
                  "Pantau perkembangan tugas Anda dengan mudah dan efektif",
                icon: "📈",
              },
              {
                title: "Notifikasi",
                description:
                  "Dapatkan pengingat untuk deadline tugas yang akan datang",
                icon: "🔔",
              },
            ].map((feature) => (
              <div key={feature.title} className="relative group">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-all duration-300" />
                <div className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <span className="inline-flex items-center justify-center p-1 px-3 text-sm font-medium rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-600/20">
                🤝 Our Team
              </span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Meet the People Behind Studo
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                {
                  name: "John Doe",
                  role: "Founder & CEO",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                  coverImage:
                    "https://images.unsplash.com/photo-1579389083395-4507e98b5b67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  bio: "Visioner yang berdedikasi untuk membantu mahasiswa mengelola tugas dengan lebih baik",
                  social: {
                    linkedin: "#",
                    twitter: "#",
                  },
                },
                {
                  name: "Jane Smith",
                  role: "Chief Technology Officer",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                  coverImage:
                    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  bio: "Ahli teknologi dengan passion dalam menciptakan solusi inovatif",
                  social: {
                    linkedin: "#",
                    twitter: "#",
                  },
                },
                {
                  name: "Alex Brown",
                  role: "Head of Product",
                  image:
                    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                  coverImage:
                    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  bio: "Spesialis produk yang fokus pada pengalaman pengguna terbaik",
                  social: {
                    linkedin: "#",
                    twitter: "#",
                  },
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 z-10" />
                    <img
                      src={member.coverImage}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Profile Content */}
                  <div className="p-6">
                    {/* Profile Image - Positioned to overlap cover image */}
                    <div className="relative -mt-20 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                      <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-32 h-32 mx-auto rounded-full object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Text content */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-indigo-600">
                        {member.role}
                      </p>
                      <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                        {member.bio}
                      </p>
                    </div>

                    {/* Social links */}
                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-4">
                      {/* ...existing social links code... */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
