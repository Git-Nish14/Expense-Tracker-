import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      <div className="flex space-x-4">
        <Link href="/login">
          <button className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
