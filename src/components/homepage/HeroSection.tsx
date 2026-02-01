"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Fresh Meals, Delivered Fast",
    subtitle: "Healthy, homemade food from trusted providers.",
    cta: "Explore Meals",
    catUrl: "/meals",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200",
  },
  {
    id: 2,
    title: "Trusted Home Chefs Near You",
    subtitle: "Support local providers & eat better every day.",
    cta: "Find Providers",
    catUrl: "/providers",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1200",
  },
  {
    id: 3,
    title: "Quality Food. Honest Pricing.",
    subtitle: "No junk. No compromise. Just real food.",
    cta: "Order Now",
    catUrl: "/order",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden rounded-b-2xl">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative min-w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent">
              <div className="mx-auto flex h-full max-w-7xl items-center px-6">
                <div className="max-w-xl space-y-5 text-white">
                  <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-200 md:text-xl">
                    {slide.subtitle}
                  </p>

                  <div className="flex gap-4 pt-4">
                   <Link href={slide.catUrl}>
                    <Button 
                     size="lg" className="bg-primary text-white">
                      {slide.cta}
                    </Button>
                   </Link>
                    <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-black hover:bg-white hover:text-black"
                    >
                      Learn More
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 backdrop-blur hover:bg-white"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 backdrop-blur hover:bg-white"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition ${
              current === i ? "bg-white scale-110" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
