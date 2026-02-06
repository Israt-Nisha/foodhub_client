import MealsGrid from "@/components/meals/MealsGrid";
import { mealService } from "@/services/meal.service";
import { userService } from "@/services/user.service";

const Meals = async () => {
  const {data} = await mealService.getAllMeals();

  return (
    <div className="container mx-auto px-4 space-y-10 pb-10">
      
      <MealsGrid meals={data ?? []} />
    </div>
  );
};

export default Meals;