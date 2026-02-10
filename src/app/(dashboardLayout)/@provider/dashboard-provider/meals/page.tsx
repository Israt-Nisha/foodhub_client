
import MealsManage from "@/components/providerDashboard/manageMealsPage/MealMange";
import { Roles } from "@/constants/roles";
import { providerService } from "@/services/provider.service";
import { userService } from "@/services/user.service";

const ManageMealPage = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user || user.role !== "PROVIDER") {
    return <p className="p-6">You are not authorized</p>;
  }

  const { data: providers } = await providerService.getAllProviders();

  const provider = providers?.find(
    (provider: any) => provider.userId === user.id,
  );

  if (!provider) {
    return <p className="p-6 text-red-500">For adding meals, first create your Provider Profile</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Meals Management</h1>
      <MealsManage providerId={provider.id} /> 
    </div>
  );
};

export default ManageMealPage;
