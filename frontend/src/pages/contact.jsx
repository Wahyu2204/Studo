"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Field, Label, Switch } from "@headlessui/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Contact() {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <Navbar />
      <div className="relative isolate bg-gradient-to-b from-white to-indigo-50/50 px-6 py-24 sm:py-32 lg:px-8">
        {/* Enhanced background effect */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          {/* Enhanced header */}
          <div className="inline-flex items-center justify-center p-1 px-3 mb-8 text-sm font-medium rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-600/20">
            <span className="mr-2">✉️</span>
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-balance bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent sm:text-5xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg/8 text-gray-600">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        {/* Enhanced form */}
        <form className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* Input fields with enhanced styling */}
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5 relative">
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-shadow duration-200"
                  placeholder="John"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5 relative">
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-shadow duration-200"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5 relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-shadow duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2.5 relative">
                <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 transition-shadow duration-200">
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-l-lg border-0 bg-transparent py-3 pl-4 pr-7 text-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                  >
                    <option>ID</option>
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <input
                    type="tel"
                    id="phone-number"
                    name="phone-number"
                    className="block w-full border-0 py-3 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="(555) 987-6543"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5 relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-shadow duration-200"
                  placeholder="Tell us about your inquiry..."
                />
              </div>
            </div>

            {/* Enhanced privacy policy toggle */}
            <Field className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={`${
                    agreed ? "bg-indigo-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    className={`${
                      agreed ? "translate-x-5" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <Label className="text-sm text-gray-600">
                By selecting this, you agree to our{" "}
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  privacy&nbsp;policy
                </a>
                .
              </Label>
            </Field>
          </div>

          {/* Enhanced submit button */}
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
