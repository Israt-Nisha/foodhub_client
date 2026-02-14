import { ShieldCheck, Truck, UtensilsCrossed, BadgeCheck } from "lucide-react";

export const WhyWeBest = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
     
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why FoodHub is the Best Choice
          </h2>
          <p className="mt-4 text-muted-foreground">
            We connect you with trusted food providers and ensure every order is safe,
            fresh, and delivered on time.
          </p>
        </div>

      
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Verified Providers"
            desc="All restaurants and providers are verified to ensure quality and safety."
          />
          <FeatureCard
            icon={<UtensilsCrossed className="h-6 w-6" />}
            title="Fresh & Hygienic Food"
            desc="Meals are prepared with proper hygiene and quality ingredients."
          />
          <FeatureCard
            icon={<Truck className="h-6 w-6" />}
            title="Fast Delivery"
            desc="Get your food delivered quickly without compromising quality."
          />
          <FeatureCard
            icon={<BadgeCheck className="h-6 w-6" />}
            title="Trusted by Customers"
            desc="Thousands of happy customers trust FoodHub every day."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="group rounded-2xl border bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};
