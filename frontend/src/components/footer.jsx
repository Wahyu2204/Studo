import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        {/* Logo dan Deskripsi */}
        <div className="flex justify-center md:order-1 md:mt-0">
          <a href="#" className="flex items-center">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            <span className="ml-3 text-lg font-semibold">Your Company</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400 md:order-4 md:mt-0">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
