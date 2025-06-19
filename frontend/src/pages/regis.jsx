import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
// The @react-oauth/google package is removed as it's not compatible with this environment.
// We will use the Google Identity Services library directly from a CDN.

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();
  const googleButtonRef = useRef(null); // Ref to the Google Sign-In button container

  // Function to handle successful Google Sign-In
  const handleGoogleSuccess = useCallback(
    async (credentialResponse) => {
      console.log("Google sign-in token:", credentialResponse.credential);
      // Ideally, send credentialResponse.credential to your backend for verification
      // and to create a user session or a new account.
      // Example: await fetch('http://<YOUR_EC2_PUBLIC_IP_ADDRESS>:4000/api/auth/google', { method: 'POST', ... });

      // For now, we'll assume success and navigate.
      // This should be replaced with a proper token-based state management from the backend.
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    },
    [navigate]
  );

  // This effect loads and initializes the Google Sign-In script
  useEffect(() => {
    // Check if the Google script is already loaded
    if (window.google) {
      // If it is, just initialize and render the button
      window.google.accounts.id.initialize({
        // Replace with your actual Google Cloud Client ID
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
        callback: handleGoogleSuccess,
      });
      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        { theme: "outline", size: "large", width: "100%" } // Customization options
      );
      return;
    }

    // If the script is not loaded, create and append it to the body
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize the Google Identity Services client after the script has loaded
      window.google.accounts.id.initialize({
        // Replace with your actual Google Cloud Client ID
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
        callback: handleGoogleSuccess,
      });
      // Render the Google Sign-In button in the specified container
      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { theme: "outline", size: "large", width: "100%" } // Customization options
        );
      }
    };
    script.onerror = () => {
      setError("Failed to load Google Sign-In script. Please try again.");
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [handleGoogleSuccess]); // Add handleGoogleSuccess as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new submission

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    // Replace this URL with the public IP address or DNS of your EC2 instance
    const API_URL = "http://localhost:4000/api/register";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle server-side errors (e.g., email already exists)
        throw new Error(data.message || "Failed to register.");
      }

      // You could store a JWT token returned from the server here
      // localStorage.setItem('token', data.token);
      alert("Registration successful! Please login.");
      navigate("/login"); // Redirect to the login page
    } catch (err) {
      // Catch errors from the fetch call or server
      console.error("Registration failed:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Left side */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Students studying"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1000x1200/6366f1/ffffff?text=Studo";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-blue-600/90" />
        <div className="relative z-10 flex flex-col justify-center h-full p-12">
          <h1 className="text-4xl font-bold text-white mb-6">
            Join Studo Today
          </h1>
          <p className="text-indigo-100 text-lg max-w-md">
            Create your account and start managing your academic tasks more
            efficiently.
          </p>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start your journey with Studo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-5">
              {/* Input fields remain the same */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
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
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow duration-200"
                    placeholder="Create a password"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow duration-200"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>

            {/* Display error messages if any */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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

            {/* Container for the Google Sign-In Button */}
            <div ref={googleButtonRef} className="flex justify-center"></div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
