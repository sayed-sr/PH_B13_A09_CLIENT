"use client";

import { useState } from "react";
import {Button,Input,Label,Modal,TextArea,TextField,
} from "@heroui/react";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function EditPetModal({ pet }) {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (user?.email !== pet.ownerEmail) {
      return toast.error("Only owner can edit this pet");
    }

    const formData = new FormData(e.currentTarget);
    const updatedPet = Object.fromEntries(formData.entries());

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${pet._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(updatedPet),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Pet updated successfully");
        setOpen(false);
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white"
      >
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Edit Pet</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={handleUpdate} className="space-y-4">

                <TextField name="petName" defaultValue={pet.petName} isRequired>
                  <Label>Pet Name</Label>
                  <Input />
                </TextField>

                <TextField name="category" defaultValue={pet.category}>
                  <Label>Category</Label>
                  <Input />
                </TextField>

                <TextField name="breed" defaultValue={pet.breed}>
                  <Label>Breed</Label>
                  <Input />
                </TextField>

                <TextField name="age" defaultValue={pet.age}>
                  <Label>Age</Label>
                  <Input />
                </TextField>

                <TextField name="gender" defaultValue={pet.gender}>
                  <Label>Gender</Label>
                  <Input />
                </TextField>

                <TextField name="imageUrl" defaultValue={pet.imageUrl}>
                  <Label>Image URL</Label>
                  <Input />
                </TextField>

                <TextField name="healthStatus" defaultValue={pet.healthStatus}>
                  <Label>Health Status</Label>
                  <Input />
                </TextField>

                <TextField name="vaccinationStatus" defaultValue={pet.vaccinationStatus}>
                  <Label>Vaccination Status</Label>
                  <Input />
                </TextField>

                <TextField name="location" defaultValue={pet.location}>
                  <Label>Location</Label>
                  <Input />
                </TextField>

                <TextField name="adoptionFee" defaultValue={pet.adoptionFee}>
                  <Label>Adoption Fee</Label>
                  <Input />
                </TextField>

                <TextField name="description" defaultValue={pet.description}>
                  <Label>Description</Label>
                  <TextArea />
                </TextField>

                <Button type="submit" className="w-full bg-blue-600 text-white">
                  Update Pet
                </Button>

              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}