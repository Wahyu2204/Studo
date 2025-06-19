import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    try {
      const res = await axios.get("http://localhost:4000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
    } catch {
      setUser(null); // bisa expired atau token tidak valid
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
