const HomeExtraSections = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 mt-16 space-y-10">

      {/* EXTRA SECTION 1 */}
      <section className="bg-white p-8 rounded-3xl shadow-sm">
        <h2 className="text-3xl font-bold mb-3">
          Adoption Process
        </h2>

        <p className="text-gray-600">
          Our adoption process is simple and transparent.
          Browse pets, submit a request, and our team will
          review your application to ensure the best match
          between pet and adopter.
        </p>
      </section>

      {/* EXTRA SECTION 2 */}
      <section className="bg-white p-8 rounded-3xl shadow-sm">
        <h2 className="text-3xl font-bold mb-3">
          Our Mission
        </h2>

        <p className="text-gray-600">
          We aim to connect loving families with pets in need
          of a home. Every adoption helps reduce stray animal
          populations and gives pets a second chance at life.
        </p>
      </section>

    </div>
  );
};

export default HomeExtraSections;