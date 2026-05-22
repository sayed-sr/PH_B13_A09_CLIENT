export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 px-6 py-12">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

     


        <div>
          <h1 className="text-3xl font-bold text-white">
            HappyPets

          </h1>



          <p className="mt-3 text-sm">
        Connecting loving homes with pets in need of care and adoption.
          </p>



        </div>

     
        <div>
          <h2 className="text-white font-semibold mb-3">
            Contact


          </h2>
          <p>Email: support@happypets.com</p>
 <p>Phone: +880 1234 567890</p>


          <p>Location: Bangladesh</p>
        </div>

     
        <div>
          <h2 className="text-white font-semibold mb-3">
            Social Links


          </h2>
    <p>Facebook</p>

          <p>Instagram</p>


    <p>Twitter</p>
        </div>

      </div>

     
      <div className="text-center mt-10 border-t border-gray-700 pt-4 text-sm">
       
       
        © 2026 HappyPets. All rights reserved.
   </div>

    </footer>
  );
}