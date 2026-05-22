"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

// 👉 Your existing modal (adjust path if needed)
import EditPetModal from "@/components/EditPetModal";

export default function EditPetPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PET
  // =========================
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`);
        const data = await res.json();

        setPet(data);
      } catch (err) {
        toast.error("Failed to load pet");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  // =========================
  // UPDATE HANDLER
  // =========================
  const handleUpdate = async (updatedData) => {
    try {
      const token = (await authClient.token()).data?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Update failed");
        return;
      }

      toast.success("Pet updated successfully");

      // go back to dashboard
      router.push("/dashboard/my-listings");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="h-60 flex items-center justify-center">
        Loading pet data...
      </div>
    );
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!pet) {
    return (
      <div className="text-center py-10">
        Pet not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-5">
        Edit Pet
      </h1>

      {/* YOUR EXISTING MODAL COMPONENT USED AS FORM */}
      <EditPetModal
        pet={pet}
        onSubmit={handleUpdate}
      />

    </div>
  );
}