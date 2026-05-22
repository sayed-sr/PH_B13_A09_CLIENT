"use client";

import {
  Button,Card,FieldError,Input, Label,TextArea,TextField,} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function AddPetPage() {
  const router = useRouter();
const { data: session } = authClient.useSession();

  const user = session?.user;

const onSubmit = async (e) => {
   
  e.preventDefault();

 
    if (!user?.email) {

      toast.error("You must be logged in to add a pet");
    
      return router.push("/login");
    }

    const formData = new FormData(e.currentTarget);
   
    const pet = Object.fromEntries(formData.entries());

   pet.age = Number(pet.age);
    pet.adoptionFee = Number(pet.adoptionFee);

    
    pet.ownerEmail = user.email;


   pet.status = "available";

pet.createdAt = new Date(); 

  
    const { data: tokenData } = await authClient.token();

    if (!tokenData?.token) {

      toast.error("Authentication failed. Please login again.");

      return router.push("/login");
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
      method: "POST",
        headers: {
         
          "content-type": "application/json",
          authorization: `Bearer ${tokenData.token}`,
        
        },
        body: JSON.stringify(pet),
      });

    const data = await res.json();

      
    if (!res.ok) {
   throw new Error(data?.message || "Failed to add pet");
      }



  toast.success("Pet added successfully!");
      router.push("/dashboard/my-listings");
    } 
    
    
    catch (err) {
      toast.error(err.message);
    }
  };

  return (

    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Add Pet</h1>

      <Card className="p-6">
        <form
         
         
  onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <TextField name="petName" isRequired>
   <Label>Pet Name</Label>
            <Input />
          </TextField>

  
   <TextField name="category" isRequired>
 <Label>Species</Label>
            <Input placeholder="Dog / Cat / Bird" />
          </TextField>

        
    <TextField name="breed" isRequired>
         <Label>Breed</Label>
            <Input />
   </TextField>

   <TextField name="age" type="number" isRequired>
            <Label>Age</Label>
   <Input />
     </TextField>

          <TextField name="gender" isRequired>
  <Label>Gender</Label>
       <Input />
          </TextField>

          <TextField name="imageUrl" isRequired>
       <Label>Image URL</Label>
   <Input />
          </TextField>

  <TextField name="healthStatus" isRequired>
    <Label>Health Status</Label>
            <Input />
          </TextField>

 <TextField name="vaccinationStatus" isRequired>
   <Label>Vaccination Status</Label>
            <Input />
          </TextField>

   <TextField name="location" isRequired>
            <Label>Location</Label>
       <Input />
          </TextField>

     <TextField name="adoptionFee" type="number" isRequired>
    <Label>Adoption Fee</Label>
     
         <Input />
          </TextField>

 <div className="md:col-span-2">
  <TextField name="description" isRequired>
    <Label>Description</Label>
      <TextArea />
  </TextField>
          </div>

  <div className="md:col-span-2">
            <TextField>
      <Label>Owner Email</Label>
  <Input value={user?.email || ""} readOnly />
            </TextField>
          </div>

     <div className="md:col-span-2">
   <Button type="submit" className="w-full bg-cyan-500 text-white">
      Add Pet
      </Button>
   </div>
   </form>
  </Card>
    </div>
  );
}