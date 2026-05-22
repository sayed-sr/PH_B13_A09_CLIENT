"use client";

import Link from "next/link";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const RequestCard = ({ request }) => {
  const handleCancel = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/${request._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      }
    );

    const data = await res.json();




if (data.deletedCount > 0) {
      toast.success("Request cancelled");

      window.location.reload();
    }
  };

return (
    <div className="border rounded-3xl p-5 flex justify-between items-center">
      <div>
     <h2 className="text-2xl font-bold">
    {request.petName}
        </h2>

   <p className="text-gray-500">
      Pickup Date: {request.pickupDate}
        </p>

        <p className="mt-2">
     Status:
    <span className="font-bold ml-2 capitalize">
            {request.status}
          </span>
      </p>
      </div>

      <div className="flex gap-3">
  <Link href={`/pets/${request.petId}`}>
       <Button variant="outline">
            View
       </Button>
        </Link>








        <Button
          onClick={handleCancel}
          variant="danger"
        >
          Cancel
  </Button>
      </div>
    </div>
  );
};

export default RequestCard;