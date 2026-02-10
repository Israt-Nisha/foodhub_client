"use client";

import Image from "next/image";
import Link from "next/link";
import { ChefHat } from "lucide-react";

type Provider = {
  id: string;
  restaurantName: string;
  logo?: string | null;
  address?: string;
};

const ProvidersGrid = ({ providers }: { providers: Provider[] }) => {
  if (!providers?.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        No providers found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {providers.map((provider) => (
        <Link
          key={provider.id}
          href={`/providers/${provider.id}`}
          className="group bg-white rounded-2xl border p-4 sm:p-5
                     transition-all duration-300
                     hover:shadow-xl hover:-translate-y-1"
        >
          {/* LOGO */}
          <div className="flex justify-center mb-4">
            {provider.logo ? (
              <div className="
                relative 
                w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                rounded-full overflow-hidden
                border bg-white shadow-sm
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
                bg-gray-100 text-gray-400
              ">
                <ChefHat className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="text-center space-y-1">
            <h2 className="
              text-base sm:text-lg font-semibold
              line-clamp-1
              group-hover:text-primary transition
            ">
              {provider.restaurantName}
            </h2>

            {provider.address && (
              <p className="
                text-xs sm:text-sm text-gray-500
                line-clamp-2
              ">
                {provider.address}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProvidersGrid;
