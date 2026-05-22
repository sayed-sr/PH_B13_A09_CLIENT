"use client";

import { useEffect, useState } from "react";


import { authClient } from "@/lib/auth-client";


import toast from "react-hot-toast";



export default function OwnerRequestsPage() {


const { data: session } = authClient.useSession();
  const user = session?.user;



const [requests, setRequests] = useState([]);


const [loading, setLoading] = useState(true);



const getToken = async () => {
    
  

  const { data } = await authClient.token();


    return data?.token;
  };


  const fetchOwnerRequests = async () => {
  if (!user?.email) return;

 setLoading(true);

 try {
 const token = await getToken();

      
const petsRes = await fetch(
     `${process.env.NEXT_PUBLIC_SERVER_URL}/my-pets/${user.email}`,
        {

      headers: {
    authorization: `Bearer ${token}`,
          },
    }
      );

  const pets = await petsRes.json();

      
  const allRequests = [];

 for (const pet of pets) {
     const res = await fetch(

    `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption?petId=${pet._id}`,
      {
       headers: {
              authorization: `Bearer ${token}`,
     },
          }
        );

    const data = await res.json();

    if (Array.isArray(data)) {

    allRequests.push(...data);
        }
      }


      setRequests(allRequests);

   } catch (err) {

    toast.error("Failed to load requests");
    }



    setLoading(false);
  };



  useEffect(() => {
    fetchOwnerRequests();
  }, [user?.email]);

 

  const updateStatus = async (id, status) => {
    const token = await getToken();

  const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/${id}`,
      {
     method: "PATCH",
     headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

 
 
    if (res.ok) {
      toast.success(`Request ${status}`);
     
     
     
      fetchOwnerRequests();
    } else {
      const data = await res.json();
  toast.error(data?.message || "Action failed");
    }
  };

  if (!user) {


    return (
     <p className="text-center py-10">
    Login required
      </p>
    );
  }


  return (
   <div className="max-w-5xl mx-auto py-10">

      
      <h1 className="text-3xl font-bold mb-6">
   Pet Adoption Requests (Owner Panel)
      </h1>

  {loading ? (
    <p>Loading...</p>

      ) : requests.length === 0 ? (

        <p className="text-gray-500">


          No requests found
        </p>
      ) : (


  <div className="space-y-4">

  {requests.map((req) => (
    <div
   key={req._id}

            lassName="border p-4 rounded-xl bg-white shadow"
            >

              <p>
                <b>User Email:</b> {req.userEmail}
              </p>

              <p>
 <b>Pet ID:</b> {req.petId}
              </p>

              <p>
        <b>Pickup Date:</b>{" "}
    {req.pickupDate || "N/A"}
              </p>

              <p>
   <b>Status:</b>{" "}
         <span
         
                  className={
                    req.status === "approved"
               ? "text-green-600"
                : req.status === "rejected"
                ? "text-red-600"
                      : "text-yellow-500"
            }
                >
           {req.status}
                </span>
      </p>

     
       {req.status === "pending" && (
        <div className="flex gap-3 mt-3">



                  <button

                  
                    onClick={() =>
                      updateStatus(req._id, "approved")
                    }
        className="px-3 py-1 bg-green-600 text-white rounded"
                  >
            Approve
                  </button>


           <button
                    onClick={() =>
              updateStatus(req._id, "rejected")
                    }
        className="px-3 py-1 bg-red-600 text-white rounded"
            >
             Reject
            </button>

      </div>
              )}

      </div>
     ))}
     
        </div>
      )}
    </div>
  );
}