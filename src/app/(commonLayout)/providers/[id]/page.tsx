
import Image from "next/image";
import { notFound } from "next/navigation";
import { providerService } from "@/services/provider.service";
import MealsGrid from "@/components/meals/MealsGrid";
import { ChefHat, MapPin, Phone } from "lucide-react";

const ProviderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await providerService.getProviderById(id);

  // If no provider found, show 404
  if (!res.data) {
    return notFound();
  }

  const provider = res.data;

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* PROVIDER HEADER */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* LOGO */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border shadow">
          {provider.logo ? (
            <Image
              src={provider.logo}
              alt={provider.restaurantName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <ChefHat className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold">{provider.restaurantName}</h1>
          <p className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" /> {provider.address}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" /> {provider.phone}
          </p>
          <p className="text-sm text-gray-400">Total Meals: {provider.meals.length}</p>
        </div>
      </div>

      {/* MEALS */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Meals</h2>
        <MealsGrid meals={provider.meals} />
      </div>
    </div>
  );
};

export default ProviderDetailsPage;
