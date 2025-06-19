import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      // Simpan token dan data user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthenticated", "true");

      // Redirect ke dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Kirim token Google ke backend untuk verifikasi
      const response = await axios.post(
        "http://localhost:4000/api/google",
        {
          credential: credentialResponse.credential,
        },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthenticated", "true");

      // setUser(response.data.user); // Set user in context (removed because setUser is not defined)
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Left side - Image Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Large background image */}
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Students studying"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-blue-600/90" />

        {/* Content over image */}
        <div className="relative z-10 flex flex-col justify-center h-full p-12">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Studo Logo"
            className="w-32 mb-8"
          />
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome back to Studo
          </h1>
          <p className="text-indigo-100 text-lg max-w-md">
            Your personal task management platform for better productivity and
            academic success.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Log in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                className="w-full"
              />
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/regis"
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
