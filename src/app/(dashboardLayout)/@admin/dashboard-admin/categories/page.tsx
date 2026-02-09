
import CategoriesManage from "@/components/adminDashboard/manageCategoriesPage/CategoriesManage";
import MealsManage from "@/components/providerDashboard/manageMealsPage/MealMange";

const ManageCategoriesPage = async () => {
  
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Meals Management</h1>
      <CategoriesManage/>
    </div>
  );
};

export default ManageCategoriesPage;
