"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPets = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams();
      if (search.trim()) query.append("search", search.trim());
      if (category) query.append("category", category);
      
      query.append("limit", "100");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?${query.toString()}`
      );

      const data = await res.json();
      setPets(Array.isArray(data?.data) ? data.data.filter(p => p.status !== "adopted") : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  // Refetch whenever the page tab becomes visible again
  useEffect(() => {
    fetchPets();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchPets();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleSearch = () => {
    fetchPets();
  };

  const handleClear = () => {
    setSearch("");
    setCategory("");
    setTimeout(() => fetchPets(), 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-5">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-5">
        Find Your Perfect Pet 🐾
      </h1>

     <p className="text-gray-500 mb-6">
  Search by name and filter by species to find pets available for adoption. <br />
  The first 10 pets are for demo only.{" "}
  <Link href="/dashboard/add-pet" className="text-emerald-600 font-semibold underline">
    Add your own pet
  </Link>{" "}
  so others can adopt it.
</p>

      {/* SEARCH + FILTER PANEL */}
      <div className="bg-white border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">

        <input
          type="text"
          placeholder="Search pets by name..."
          className="border p-2 rounded w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="bg-emerald-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>

          <button
            onClick={handleClear}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-center py-10 text-gray-500">Loading pets...</p>
      )}

      {!loading && pets.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          No pets found matching your criteria.
        </p>
      )}

      {!loading && pets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {pets.map((pet) => (
            <div key={pet._id} className="border rounded-xl p-3 bg-white">
              <Image
                src={pet.imageUrl}
                alt={pet.petName}
                width={300}
                height={200}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="font-bold mt-2">{pet.petName}</h2>
              <p className="text-sm text-gray-500">{pet.category}</p>
              <p className="font-bold text-emerald-600">${pet.adoptionFee}</p>
              <Link href={`/pets/${pet._id}`}>
                <button className="w-full mt-2 bg-black text-white p-2 rounded">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}