import Image from "next/image";
import Link from "next/link";

const PetCard = ({ pet }) => {
  const { _id, imageUrl, petName, category, adoptionFee, status } = pet;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white hover:scale-[1.02] transition">
      
      <div className="relative">
        <Image
          src={imageUrl}
          alt={petName}
          width={400}
          height={300}
          className="w-full h-52 object-cover"
        />

        {/* NEW UI DIFFERENCE */}
        <span className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full text-white ${
          status === "adopted" ? "bg-red-500" : "bg-emerald-500"
        }`}>
          {status || "available"}
        </span>
      </div>

      <div className="p-3 space-y-1">
        <h2 className="text-lg font-bold">{petName}</h2>
        <p className="text-sm text-gray-500">{category}</p>

        <div className="flex justify-between items-center">
          <p className="font-bold text-emerald-600">
            ${adoptionFee}
          </p>

          <Link href={`/pets/${_id}`}>
            <button className="text-sm px-3 py-1 rounded-lg bg-black text-white">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;