import Banner from "@/components/Banner";
import Featured from "@/components/FeaturedPets";
import WhyAdopt from "@/components/WhyAdopt";
import SuccessStories from "@/components/SuccessStories";
import PetCareTips from "@/components/PetCareTips";

import HomeExtraSections from "@/components/HomeExtraSections";

export default function Home() {
  return (
   <>
   
   <Banner/>
   <Featured/>
   <WhyAdopt />
   <SuccessStories />
   <PetCareTips />
   <HomeExtraSections />
   </>
  );
}
