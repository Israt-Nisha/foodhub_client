
import ProvidersGrid from "@/components/providersPublicPage/ProvidersGrid";
import { providerService } from "@/services/provider.service";

const ProvidersPage = async () => {
  const { data } = await providerService.getAllProviders();

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">All Providers</h1>
      <ProvidersGrid providers={data ?? []} />
    </div>
  );
};

export default ProvidersPage;
