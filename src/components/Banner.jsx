import { Separator } from "@heroui/react";

const Banner = () => {
  return (
    <div className="bg-[url('/assets/Banner.png')] text-white  flex justify-between flex-col items-center  gap-5 h-150">
      <div className="p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1">
        <h1 className="text-7xl">
          Find <br /> Your Forever Friend
        </h1>

        <p className="text-2xl">
         Adopt Love, Not Just Pets
        </p>

      </div>

      
    </div>
  );
};

export default Banner;