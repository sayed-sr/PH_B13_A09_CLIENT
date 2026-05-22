"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "@heroui/react";


import toast from "react-hot-toast";


import { authClient } from "@/lib/auth-client";

export default function RequestsModal({ pet }) {


  const [open, setOpen] = useState(false);


  const [requests, setRequests] = useState([]);


  const { data: session } = authClient.useSession();



  const user = session?.user;

  const getToken = async () => {
    const { data } = await authClient.token();




    return data?.token;
  };

  // FETCH REQUESTS FOR THIS PET
  const fetchRequests = async () => {

    
    const token = await getToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption?petId=${pet._id}`,
      {
        
        
        
        
  headers: {
          authorization: `Bearer ${token}`,




        },
      }
    );

const data = await res.json();



    setRequests(Array.isArray(data) ? data : []);
  };


  useEffect(() => {



  if (open) fetchRequests();
  }, [open]);



  
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

const data = await res.json();

    if (res.ok) {

 toast.success(`Request ${status}`);





      fetchRequests();
    } 
    
    
    else {
  toast.error(data?.message || "Action failed");
    }
  };




return (
  <>
    <Button
      onClick={() => setOpen(true)}
      
      
      
      
      className="bg-indigo-600 text-white"
    >
   Requests
    </Button>

 <Modal isOpen={open} onClose={() => setOpen(false)}>




  <div className="bg-white p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">

          Adoption Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-gray-500">
            No requests found
          </p>
        ) : (
          requests.map((req) => (
            <div
              key={req._id}
              className="border p-3 rounded mb-3"
            >
 <p><b>User:</b> {req.userName}</p>

      
      
      
     <p><b>Email:</b> {req.userEmail}</p>

      <p><b>Pickup:</b> {req.pickupDate}</p>

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
           <div className="flex gap-2 mt-2">

           <Button
                    size="sm"
                    className="bg-green-600 text-white"
            onClick={() =>
                      updateStatus(req._id, "approved")
                    }
                  >
         Approve
                  </Button>

       <Button
            size="sm"
                  
            
            className="bg-red-600 text-white"
                    onClick={() =>
        updateStatus(req._id, "rejected")
                    }
                  >
                    Reject
       </Button>

                </div>
      )}
            </div>
          ))
   )}

      </div>
    </Modal>
  </>
);
}