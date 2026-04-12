"use client";

import Image from "next/image";
import Link from "next/link";
import { ChefHat, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type Provider = {
  id: string;
  restaurantName: string;
  logo?: string | null;
  address?: string;
  description?: string;
};

const ProvidersGrid = ({ providers, isLoading = false }: { providers: Provider[]; isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl border border-border p-4 sm:p-5 space-y-4"
          >
            {/* Logo skeleton */}
            <div className="flex justify-center">
              <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full" />
            </div>

            {/* Title skeleton */}
            <Skeleton className="h-5 w-3/4 mx-auto rounded-md" />

            {/* Address skeleton */}
            <div className="space-y-1">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-5/6 mx-auto rounded-md" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-1">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-4/5 mx-auto rounded-md" />
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (!providers?.length) {
    return (
      <p className="text-center text-muted-foreground py-10">
        No providers found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {providers.map((provider) => (
        <div
          key={provider.id}
          className="group bg-card rounded-2xl border border-border p-4 sm:p-5
                     transition-all duration-300
                     hover:shadow-xl hover:border-primary/50
                     flex flex-col"
        >
          {/* LOGO */}
          <div className="flex justify-center mb-4">
            {provider.logo ? (
              <div className="
                relative 
                w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                rounded-full overflow-hidden
                border border-border bg-card shadow-sm
              ">
                <Image
                  src={provider.logo}
                  alt={provider.restaurantName}
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="
                flex items-center justify-center
                w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                rounded-full
                bg-muted text-muted-foreground
              ">
                <ChefHat className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="text-center space-y-2 flex-1">
            <h2 className="
              text-base sm:text-lg font-semibold text-foreground
              line-clamp-1
              group-hover:text-primary transition
            ">
              {provider.restaurantName}
            </h2>

            {provider.address && (
              <p className="
                text-xs sm:text-sm text-muted-foreground
                line-clamp-2
              ">
                {provider.address}
              </p>
            )}

            {provider.description && (
              <p className="
                text-xs text-muted-foreground
                line-clamp-2
              ">
                {provider.description}
              </p>
            )}
          </div>

          {/* ACTION BUTTON */}
          <Link href={`/providers/${provider.id}`} className="mt-4">
            <Button variant="outline" size="sm" className="w-full gap-2">
              View Details
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProvidersGrid;
