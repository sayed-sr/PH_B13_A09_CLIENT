"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

const handleLogout = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/";
      },
    },
  });
};

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white">

      {/* LEFT */}
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl text-emerald-600">
          HappyPets
        </Link>

        <Link href="/">Home</Link>
        <Link href="/pets">All Pets</Link>

        {user && (
          <>
            <Link href="/dashboard/my-requests">My Requests</Link>
            <Link href="/dashboard/add-pet">Add Pet</Link>
            <Link href="/dashboard/owner-requests">
              Owner Requests
            </Link>
            <Link href="/dashboard/my-listings">
              My listing
            </Link>
          </>
        )}
      </div>

  

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {!user ? (
          <div className="flex items-center gap-3">

            <Link href="/login">
              <Button className="bg-emerald-500 text-white">
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button className="bg-cyan-500 text-white">
                Sign Up
              </Button>
            </Link>

          </div>
        ) : (
          <div className="flex items-center gap-4">

            <Avatar>
              <Avatar.Image src={user.image} />
              <Avatar.Fallback>
                {user.name?.charAt(0)}
              </Avatar.Fallback>
            </Avatar>

            <span className="hidden md:block">
              {user.name}
            </span>

            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white"
            >
              Logout
            </Button>

          </div>
        )}
      </div>

    </nav>
  );
}