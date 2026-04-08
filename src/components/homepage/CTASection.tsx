import { ArrowRight, ShoppingBag, Utensils, Sparkles } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-background">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-primary p-8 md:p-16 shadow-2xl">
          {/* Decorative glass circles */}
          <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-black/5 blur-2xl" />

          <div className="relative flex flex-col items-center gap-12 text-center lg:flex-row lg:text-left">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-md border border-white/20">
                <Sparkles className="h-4 w-4 text-orange-300" />
                <span>Join the Food Revolution</span>
              </div>

              <h2 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-6xl">
                Ready to taste the <span className="text-orange-200">extraordinary?</span>
              </h2>

              <p className="text-lg leading-relaxed text-primary-foreground/80 max-w-2xl">
                Experience the finest culinary delights from your neighborhood's best-kept secrets.
                Whether you're a foodie or a provider, FoodHub is your gateway to greatness.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/meals"
                  className="group flex items-center gap-2 rounded-2xl bg-primary-foreground px-8 py-4 text-lg font-bold text-primary transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Order Your First Meal
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-2 rounded-2xl border-2 border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 text-lg font-bold text-primary-foreground backdrop-blur-md transition-all hover:border-primary-foreground/50 hover:bg-primary-foreground/20 active:scale-95"
                >
                  <Utensils className="h-5 w-5" />
                  Grow Your Business
                </Link>
              </div>
            </div>

            {/* Visual element placeholder or floating content */}
            <div className="hidden lg:block relative h-64 w-64 shrink-0">
              <div className="absolute inset-0 rounded-3xl bg-primary-foreground/10 backdrop-blur-3xl border border-primary-foreground/20 rotate-12 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-5xl font-black text-primary-foreground/20 mb-2">HOT</div>
                  <div className="text-sm font-medium text-primary-foreground/60">DISCOVER QUALITY</div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-primary-foreground/20 -rotate-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
