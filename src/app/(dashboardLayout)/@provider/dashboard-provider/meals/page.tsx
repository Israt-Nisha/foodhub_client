
import MealsManage from "@/components/providerDashboard/manageMealsPage/MealMange";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

const ManageMealPage = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;


  if (user?.role !== "PROVIDER") {
    return <p className="p-6">You are not from authorized</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      <MealsManage userId={user.id} />
    </div>
  );
};

export default ManageMealPage;
