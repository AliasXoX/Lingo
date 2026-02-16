import Link from "next/link";
import { register } from "../actions/auth";

export default function Register() {
  return (
    <main className="flex-1 flex flex-col items-center align-center justify-center px-56">
      <div className="flex flex-col items-center align-center justify-center bg-[var(--color-neutral-lightest)] w-1/2 rounded-lg p-8">
        <div className="flex flex-col items-center align-center justify-center mb-18">
          <h1 className="text-7xl font-bold mb-4 font-[family-name:var(--font-heading)]">Sign Up</h1>
          <p className="text-gray-600 text-xl">Please register for an account</p>
        </div>
        <form action={register} className="flex w-full flex-col align-center gap-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border w-full text-2xl border-gray-300 rounded px-4 py-2" 
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border w-full text-2xl border-gray-300 rounded px-4 py-2" 
          />
          <button
            type="submit"
            className="bg-blue-500 w-full text-2xl text-white rounded px-4 py-2 mt-8 cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
        </form>
        <div>
          <p className="text-gray-600 text-lg mt-4">{"Already have an account ? "}<Link href="/login" className="text-blue-500 hover:underline">Login here</Link></p>
        </div>
      </div>
    </main>
  );
}
