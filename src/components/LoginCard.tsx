import Link from "next/link";
import { LoginCardLogo } from "@/src/components/LoginCardLogo";
import { _BaseCard } from "@/src/components/_BaseCard";

export const LoginCard = () => {
  return (
    <_BaseCard>
      <LoginCardLogo />
      <form className="mt-6">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            className="block w-full px-4 py-2 mt-2  bg-bgContent border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-semibold ">
            Password
          </label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 bg-bgContent border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <Link href="/forget" className="text-xs  hover:underline">
          Forget Password?
        </Link>
        <div className="mt-2">
          <button className="w-full px-4 py-2 tracking-wide bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold  rounded">
            Login
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </_BaseCard>
  );
};
