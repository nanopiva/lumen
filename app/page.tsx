import HeroMain from "@/components/HomePage/HeroMain/HeroMain";
import FeaturedProducts from "@/components/HomePage/FeaturedProducts/FeaturedProducts";
import AboutSection from "@/components/HomePage/AboutSection/AboutSection";
import BenefitsSection from "@/components/HomePage/BenefitsSection/BenefitsSection";
import TestimonialsSection from "@/components/HomePage/TestimonialsSection/TestimonialsSection";
import FinalCTA from "@/components/HomePage/FinalCTA/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroMain />
      <FeaturedProducts />
      <AboutSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
