import FeaturedProviders from "@/components/homepage/FeaturedProviders";
import HeroSection from "@/components/homepage/HeroSection";
import CategorySections from "@/components/homepage/homeCategory";
import RecentMeal from "@/components/homepage/RecentMeals";
import { WhyWeBest } from "@/components/homepage/WhyBest";


export default async function Home() {

  return (
    <div>
      <HeroSection />
      <CategorySections/>
      <RecentMeal />
      <FeaturedProviders/>
      <WhyWeBest />
    </div>
  );
}
