const WhyAdopt = () => {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-5">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Adopt Pets?
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="p-6 border rounded-2xl text-center">
          <h3 className="text-xl font-bold mb-2">Save a Life</h3>
          <p className="text-gray-600">
            Adoption gives homeless pets a second chance at life.
          </p>
        </div>

        <div className="p-6 border rounded-2xl text-center">
          <h3 className="text-xl font-bold mb-2">Cost Effective</h3>
          <p className="text-gray-600">
            Adoption fees are much lower than buying pets.
          </p>
        </div>

        <div className="p-6 border rounded-2xl text-center">
          <h3 className="text-xl font-bold mb-2">Healthy Pets</h3>
          <p className="text-gray-600">
            Most adopted pets are vaccinated and health-checked.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyAdopt;