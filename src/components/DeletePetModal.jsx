"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function DeletePetModal({ pet, onRefresh }) {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleDelete = async () => {
    if (user?.email !== pet.ownerEmail) {
      return toast.error("Only owner can delete this pet");
    }

    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${pet._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${tokenData?.token}`,
      },
    });

    if (res.ok) {
      toast.success("Pet deleted");
      setOpen(false);
      onRefresh?.(); // ✅ NO reload
    } else {
      const data = await res.json();
      toast.error(data?.message || "Delete failed");
    }
  };

  return (
  <>
    <Button
      className="bg-red-500 text-white"
      onClick={() => setOpen(true)}
    >
      Delete
    </Button>

    <Modal isOpen={open} onOpenChange={setOpen}>
      <div className="bg-white p-6 rounded-xl">

        <h2 className="text-xl font-bold mb-4">
          Delete Pet
        </h2>

        <p>
          Are you sure you want to delete{" "}
          <b>{pet.petName}</b>?
        </p>

        <div className="flex gap-2 mt-4">
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            className="bg-red-600 text-white"
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </div>

      </div>
    </Modal>
  </>
);
}