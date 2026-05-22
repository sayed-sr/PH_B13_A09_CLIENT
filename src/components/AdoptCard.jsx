"use client";

import { authClient } from "@/lib/auth-client";

import {Button,Input,Label,Modal,TextArea,TextField,} from "@heroui/react";

import toast from "react-hot-toast";



const AdoptCard = ({ pet }) => {


const { data: session } = authClient.useSession();



  const user = session?.user;

const handleAdoption = async (e) => {
   
e.preventDefault();

    if (user?.email === pet.ownerEmail) {

      return toast.error("You cannot adopt your own pet");
    }

    const formData = new FormData(e.currentTarget);

    const adoptionData = Object.fromEntries(formData.entries());

adoptionData.petId = pet._id;
    adoptionData.petName = pet.petName;
adoptionData.userName = user?.name;
    adoptionData.userEmail = user?.email;
adoptionData.status = "pending";

    const { data: tokenData } = await authClient.token();

const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption`, {
      method: "POST",
   headers: {
       
    
    "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
  body: JSON.stringify(adoptionData),
    });

    const data = await res.json();

                       if (data.insertedId) {
      toast.success("Adoption request submitted");
    }
  };

  return (
    <Modal>
     <Button className="bg-emerald-500 rounded-full">
        Adopt Now
      </Button>

     <Modal.Backdrop>
        <Modal.Container>
        <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />

            <Modal.Header>
       <Modal.Heading>
           Adopt {pet.petName}
              </Modal.Heading>
     </Modal.Header>

            <Modal.Body>
       <form
                onSubmit={handleAdoption}
         className="space-y-5"
              >
     <TextField
                  isRequired
                  name="petName"
           defaultValue={pet.petName}
                  isReadOnly
        >
           <Label>Pet Name</Label>
        <Input />
                </TextField>

           <TextField
             isRequired
                  name="userName"
       defaultValue={user?.name}
                  isReadOnly
                >











                  
           <Label>User Name</Label>
         <Input />
                </TextField>

      <TextField
                  isRequired
        name="userEmail"
          defaultValue={user?.email}
                  isReadOnly
                >
      <Label>User Email</Label>
          <Input />
                </TextField>

                <TextField
          isRequired
                  name="pickupDate"
                  type="date"
                >
                  <Label>Pickup Date</Label>
                  <Input type="date" />
                </TextField>

   <TextField
         isRequired
                  name="message"
                >
                  <Label>Message</Label>

                  <TextArea
           placeholder="Why do you want to adopt this pet?"
                  />
         </TextField>

                <Button
                  type="submit"
                  className="w-full bg-emerald-500"
            >
           Submit Request
         </Button>
        </form>
      </Modal.Body>
     </Modal.Dialog>
   </Modal.Container>
   </Modal.Backdrop>
    </Modal>
  );
};

export default AdoptCard;