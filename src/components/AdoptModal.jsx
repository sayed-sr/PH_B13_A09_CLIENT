"use client";

import { Button, Card, Input, TextArea } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AdoptModal({ pet }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [pickupDate, setPickupDate] = useState("");

  const handleAdopt = async () => {
    if (!user) return toast.error("Login required");

    const { data: tokenData } = await authClient.token();

    const payload = {
      petId: pet._id,
      petName: pet.petName,
      userName: user.name,
      userEmail: user.email,
      pickupDate,
      message: "I want to adopt this pet",
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
      toast.success("Adoption request sent!");
    } else {
      toast.error(data.message || "Failed");
    }
  };

  return (
    <Card className="p-5">
      <h2 className="text-xl font-bold">Adopt This Pet</h2>

      <Input value={pet.petName} readOnly className="mt-3" />
      <Input value={user?.name || ""} readOnly className="mt-3" />
      <Input value={user?.email || ""} readOnly className="mt-3" />

      <Input
        type="date"
        className="mt-3"
        onChange={(e) => setPickupDate(e.target.value)}
      />

      <TextArea
        placeholder="Message"
        className="mt-3"
      />

      <Button
        onClick={handleAdopt}
        className="w-full mt-4 bg-cyan-500 text-white"
      >
        Submit Adoption
      </Button>
    </Card>
  );
}