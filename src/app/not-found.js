import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-5">

  <h1 className="text-8xl font-bold text-emerald-500">
        404
      </h1>

  <h2 className="text-4xl font-bold mt-5">
        Page Not Found
      </h2>

<p className="text-gray-500 mt-5 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
   href="/"
   className="mt-10 bg-emerald-500 text-white px-8 py-4 rounded-full"
      >
        Back To Home
      </Link>
    </div>
  );
}