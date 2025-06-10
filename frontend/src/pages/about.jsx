import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function About() {
  return (
    <>
      <Navbar />
      {/* Konten Utama */}
      <main className="flex-grow relative overflow-hidden">
        {/* Background Gradient Lingkaran Buram */}
        <div
          aria-hidden="true"
          className="absolute bottom-[-10%] -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[-5%] aspect-1155/678 w-144.5 -translate-x-0 rotate-45 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[-10%] sm:w-288.75"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 relative z-10">
          {/* Judul dan Deskripsi */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              We are a passionate team dedicated to enriching your online
              business with innovative data solutions. Our mission is to empower
              businesses by providing tools and insights that drive growth and
              success.
            </p>
          </div>

          {/* Tim (Opsional) */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Meet Our Team
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {/* Anggota Tim 1 */}
              <div className="text-center">
                <div className="h-24 w-24 mx-auto rounded-full bg-gray-200" />{" "}
                {/* Placeholder untuk foto */}
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  John Doe
                </h3>
                <p className="mt-1 text-sm text-gray-600">Founder & CEO</p>
              </div>
              {/* Anggota Tim 2 */}
              <div className="text-center">
                <div className="h-24 w-24 mx-auto rounded-full bg-gray-200" />{" "}
                {/* Placeholder untuk foto */}
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Jane Smith
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Chief Technology Officer
                </p>
              </div>
              {/* Anggota Tim 3 */}
              <div className="text-center">
                <div className="h-24 w-24 mx-auto rounded-full bg-gray-200" />{" "}
                {/* Placeholder untuk foto */}
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Alex Brown
                </h3>
                <p className="mt-1 text-sm text-gray-600">Head of Product</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
