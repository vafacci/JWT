import { useCallback, useState } from "react";
import { login, logout, loggedIn, getData } from "../apiFacade"; 

export function useAuth() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    return token ? { username: "demo" } : null;
  });
  const [protectedData, setProtectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    setProtectedData(null);

    try {
      await login(username, password);

      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Login succeeded but no token was returned.");

      setUser({ username });
      const data = await getData();
      setProtectedData(data);
      return true;
    } catch (err) {
      const message = err?.error?.message || err?.message || "Login failed";
      setError(message);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    logout();
    setUser(null);
    setError(null);
    setProtectedData(null);
  }, []);

  const fetchProtectedData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getData();
      setProtectedData(data);
      return data;
    } catch (err) {
      const message = err?.error?.message || err?.error || "You are not authorized";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    protectedData,
    loading,
    error,
    isAuthenticated: loggedIn(),
    signIn,
    signOut,
    fetchProtectedData,
  };
}