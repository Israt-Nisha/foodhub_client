import MealsGrid from "../meals/MealsGrid";
import Link from "next/link";
import { providerService } from "@/services/provider.service";
import ProvidersGrid from "../providersPublicPage/ProvidersGrid";



const FeaturedProviders = async () => {
    const providersRes = await providerService.getAllProviders();
    const featuredProviders = providersRes.data?.slice(0, 4) || [];



    return (
        <section className="container mx-auto px-4 py-16 space-y-8">
            <div className="flex text-center justify-center items-center">
                <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold">Featured Providers</h2>
                    <p className="text-muted-foreground">
                        Discover top food providers and restaurants near you
                    </p>
                </div>
            </div>

            <ProvidersGrid providers={featuredProviders} />
        </section>
    );
};

export default FeaturedProviders;
