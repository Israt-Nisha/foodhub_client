import { Sparkles, Heart, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
            Our Mission is to <span className="text-primary">Connect & Nourish</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            FoodHub is more than just a delivery service. We are a bridge between passionate food providers and connoisseurs of quality taste.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2026, FoodHub started with a simple observation: there's an abundance of talented home chefs and local restaurants whose culinary masterpieces deserve to be shared, but they lack a seamless way to reach their customers.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We built FoodHub to change that. By providing a smart, intuitive platform that handles everything from ordering to delivery, we empower providers to focus on what they do best – creating delicious food.
              </p>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden bg-primary/10 flex items-center justify-center p-12">
               <div className="text-center">
                  <Heart className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce" />
                  <p className="font-bold text-2xl text-primary">Born from Passion</p>
               </div>
               {/* Abstract decorative elements */}
               <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
               <div className="absolute bottom-0 left-0 h-32 w-32 bg-primary/5 rounded-full -ml-16 -mb-16" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard 
              icon={<ShieldCheck className="h-8 w-8" />}
              title="Integrity"
              desc="We verify every provider and ensure every meal meets our high standards of quality and hygiene."
            />
            <ValueCard 
              icon={<Sparkles className="h-8 w-8" />}
              title="Excellence"
              desc="We strive for perfection in every interaction, from browsing to the final delivery to your doorstep."
            />
            <ValueCard 
              icon={<Zap className="h-8 w-8" />}
              title="Efficiency"
              desc="Our platform is optimized for speed and ease of use, ensuring you get your food when you want it."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-background border border-border shadow-sm transition hover:scale-105">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-muted-foreground">{desc}</p>
  </div>
);
