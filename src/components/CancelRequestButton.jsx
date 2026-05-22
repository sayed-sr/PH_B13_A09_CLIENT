"use client";

import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function CancelRequestButton({ id }) {
  const handleCancel = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      }
    );

    if (res.ok) {
      toast.success("Request cancelled");
      window.location.reload();
    }
  };

  return (
    <Button
      onClick={handleCancel}
      className="rounded-none bg-red-500 text-white"
    >
      Cancel
    </Button>
  );
}