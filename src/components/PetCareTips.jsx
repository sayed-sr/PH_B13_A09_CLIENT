const PetCareTips = () => {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-5">

  <h2 className="text-3xl font-bold text-center mb-10">
        Pet Care Tips


    </h2>

   <div className="grid md:grid-cols-3 gap-6">

    <div className="p-6 border rounded-2xl">
  <h3 className="font-bold mb-2">Proper Feeding</h3>
        
        
     <p className="text-gray-600 text-sm">
            Feed your pet balanced food based on age and breed.
         
         
      </p>
        </div>

    <div className="p-6 border rounded-2xl">
          <h3 className="font-bold mb-2">Regular Vet Checkups</h3>
  
  
    <p className="text-gray-600 text-sm">
            Take pets for routine health checkups and vaccinations.
      </p>
        </div>

     <div className="p-6 border rounded-2xl">
    
    
    
        <h3 className="font-bold mb-2">Daily Exercise</h3>
    <p className="text-gray-600 text-sm">
        
        
        
        
            Walk and play with pets to keep them active and happy.
          </p>
   </div>

    
  </div>
    </section>
  );
};

export default PetCareTips;