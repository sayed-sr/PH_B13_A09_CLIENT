"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import ListingCard from "@/components/ListingCard";

export default function MyListingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    if (!user?.email) return;

    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-pets/${user.email}`,
      {
        headers: {
          authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    const data = await res.json();
    setPets(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const getToken = async () => {
    const { data } = await authClient.token();
    return data?.token;
  };

  useEffect(() => {
    fetchPets();
  }, [user?.email]);

  const refresh = () => fetchPets();

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-600">
        Login required to view listings
      </div>
    );
  }

  const total = pets.length;
  const adopted = pets.filter(p => p.status === "adopted").length;
  const available = total - adopted;

  return (
    <div className="space-y-8">

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          Total: {total}
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-green-600">
          Available: {available}
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-orange-500">
          Adopted: {adopted}
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : pets.length === 0 ? (
        <p>No pets found</p>
      ) : (
        pets.map(pet => (
          <ListingCard
            key={pet._id}
            pet={pet}
            onRefresh={refresh}
          />
        ))
      )}
    </div>
  );
}