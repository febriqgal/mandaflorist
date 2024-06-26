import BestSellingSection from "./_components/BestSellingSection";
import LandingPageSection from "./_components/LandingPageSection";

export default function Home() {
  return (
    <div className="py-[74px]">
      <LandingPageSection />
      <BestSellingSection />
    </div>
  );
}
