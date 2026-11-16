import { useEffect } from "react";
import { useOutletContext } from "react-router";

export default function AuthDemoPage() {
  const { auth } = useOutletContext();

  const {
    user,
    signIn,
    signOut,
    fetchProtectedData,
    protectedData,
    error,
    loading,
    isAuthenticated,
  } = auth;

  useEffect(() => {
    if (isAuthenticated && !protectedData) {
      fetchProtectedData();
    }
  }, [isAuthenticated, protectedData, fetchProtectedData]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    await signIn(username, password);
  };

  return (
    <div>
      <h3>Auth Hook Demo</h3>

      {isAuthenticated ? (
        <div>
          <p>Logged in as {user?.username}</p>
          <button type="button" onClick={signOut}>Log out</button>

          {loading ? (
            <p>Loading protected data...</p>
          ) : protectedData ? (
            <pre>{JSON.stringify(protectedData, null, 2)}</pre>
          ) : (
            <p>No protected data available.</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input name="username" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      )}

      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </div>
  );
}