import Link from "next/link";
import { login } from "../actions/auth";

export default function Login() {
  return (
    <main className="flex-1 flex flex-col items-center align-center justify-center px-56">
      <div className="flex flex-col items-center align-center justify-center bg-[var(--color-neutral-lightest)] w-1/2 rounded-lg p-8">
        <div className="flex flex-col items-center align-center justify-center mb-18">
          <h1 className="text-7xl font-bold mb-4 font-[family-name:var(--font-heading)]">Welcome Back !</h1>
          <p className="text-gray-600 text-xl">Please sign in to your account</p>
        </div>
        <form action={login} className="flex w-full flex-col align-center gap-12">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-gray-600 text-lg">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border w-full text-2xl border-gray-300 rounded px-4 py-2" 
            >
          </input>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-600 text-lg">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border w-full text-2xl border-gray-300 rounded px-4 py-2" 
            >
          </input>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-2xl text-white rounded px-4 py-2 mt-8 cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <div>
          <p className="text-gray-600 text-lg mt-4">{"Don't have an account?"}<Link href="/register" className="text-blue-500 hover:underline">Register here</Link></p>
        </div>
      </div>
    </main>
  );
}
