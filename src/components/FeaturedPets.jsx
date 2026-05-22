import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

const FeaturedPets = async () => {
  let pets = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
      next: { revalidate: 60 },
    });

    pets = await res.json();
  } catch (error) {
    console.error("Failed to load pets:", error);
  }

  return (
    <div className="max-w-7xl mx-auto mt-16 px-5">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Featured Pets
        </h2>

        <Link href="/pets">
          <Button className="border border-cyan-500 text-white-500 rounded-full px-5">
            View All Pets
          </Button>
        </Link>
      </div>

      {/* EMPTY STATE */}
      {pets.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No featured pets available right now.
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <Image
              src={pet.imageUrl}
              alt={pet.petName}
              width={400}
              height={250}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold">{pet.petName}</h3>

              <p className="text-sm text-gray-500">
                {pet.category}
              </p>

              <p className="font-bold text-cyan-600">
                ${pet.adoptionFee}
              </p>

              <Link href={`/pets/${pet._id}`}>
                <Button className="w-full mt-2 bg-cyan-500 text-white rounded-full">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPets;