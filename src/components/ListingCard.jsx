import EditPetModal from "./EditPetModal";
import DeletePetModal from "./DeletePetModal";
import Link from "next/link";



import RequestsModal from "./RequestsModal";


export default function ListingCard({ pet, onRefresh }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">




     
      <div>
        <h2 className="text-xl font-bold">{pet.petName}</h2>





        <p className="text-gray-500">{pet.category}</p>


<p className="text-emerald-600 font-semibold">
          ${pet.adoptionFee}
        </p>
      </div>

     
      
  <div className="flex gap-2 items-center">

  <Link


    href={`/pets/${pet._id}`}
 className="px-3 py-1 bg-black text-white rounded"
  >
    View
  </Link>





  <RequestsModal pet={pet} />

  <EditPetModal pet={pet} />

  <DeletePetModal pet={pet} />

</div>

    </div>
  );
}