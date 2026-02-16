"use client";

export default function Login() {

  const handleLogin = async () => {
    fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Users data:", data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  return (
    <main className="flex-1 flex-col items-center justify-between px-56">
      <span>Login</span>
      <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
    </main>
  );
}
