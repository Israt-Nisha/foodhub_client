import CategorySection from "@/components/homepage/Category";
import HeroSection from "@/components/homepage/HeroSection";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";


export default async function Home() {

  const session = await authClient.getSession();

  console.log(session);

  return (
    <div>
      <HeroSection/>
      <CategorySection/>
    </div>
  );
}
