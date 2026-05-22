"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function PetDetailsPage() {
  const { id } = useParams();


  const router = useRouter();

  const { data: session } = authClient.useSession();

const user = session?.user;

  const [pet, setPet] = useState(null);


const [pickupDate, setPickupDate] = useState("");


  const [message, setMessage] = useState("");

  useEffect(() => {
   
   
 const fetchPet = async () => {
     
  
  try {
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`);
      
   
   const data = await res.json();
       
   
   setPet(data);


      } 
      
      catch (err) {
        console.error(err);
       
       
        setPet(null);
      }
    };

    fetchPet();


  }, [id]);

  if (!pet) {


    return (


   <div className="text-center mt-10 text-xl">

        Loading...
      </div>
    );
  }



 const handleAdopt = async () => {
  if (!user) {


toast.error("Please login to adopt a pet");


    router.push("/login");
    return;
  }



  if (pet.ownerEmail === user.email) {
 toast.error("You cannot adopt your own pet");


    return;
  }



  if (pet.status === "adopted") {
toast.error("This pet has already been adopted");


    return;
  }

  const { data: tokenData } = await authClient.token();

  const payload = {


    petId: pet._id,
    
    
    
    petName: pet.petName,
    
userName: user.name,

    userEmail: user.email,
pickupDate,


 message,



    status: "pending",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption`, {


   method: "POST",
    headers: {


   "content-type": "application/json",
  authorization: `Bearer ${tokenData?.token}`,
    },



    body: JSON.stringify(payload),
  });

  const data = await res.json();



  if (res.ok) {


    
    toast.success("Adoption request submitted");
  } 
  
  
  
  
  
  
  
  
  
  
  else {
    toast.error(data?.message || "Failed to submit request");
  }
};



  return (
    <div className="max-w-4xl mx-auto p-6">

  

      <div className="border p-5 rounded-xl mb-6">


      
        <h1 className="text-3xl font-bold">{pet.petName}</h1>

        <p className="text-gray-600 mt-2">




          Category: {pet.category}
     </p>

   <p className="text-gray-600">
      Breed: {pet.breed}
    </p>

   <p className="text-gray-600">
          Fee: ${pet.adoptionFee}
        </p>

   <p className="mt-3">{pet.description}</p>
      </div>
 
  


  <div className="border p-5 rounded-xl">
    <h2 className="text-2xl font-bold mb-4">
       
          Adoption Form
        </h2>

    <input
          className="border p-2 w-full mb-3"
       
         value={pet.petName}
      readOnly
        />

        <input
    className="border p-2 w-full mb-3"
          value={user?.name || ""}
      readOnly
        />

  <input
          className="border p-2 w-full mb-3"
  value={user?.email || ""}
          readOnly
        />

    <input
          type="date"
    className="border p-2 w-full mb-3"
  value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />

 <textarea
    className="border p-2 w-full mb-3"
    placeholder="Message"
 value={message}
          onChange={(e) => setMessage(e.target.value)}
        />



        <button
 onClick={handleAdopt}
   className="w-full bg-emerald-500 text-white p-3 rounded"
        >


   Submit Adoption Request
 </button>
      </div>
    </div>
  );
}