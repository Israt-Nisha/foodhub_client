import MealFilterPage from "@/components/meals/MealFilter";
import { mealService } from "@/services/meal.service";


const Meals = async () => {

  const res = await mealService.getAllMeals();

  return (
    <div className="container mx-auto px-4 space-y-10 py-10">
       {/* <MealFilterPage initialMeals={mealsData} /> */}
       <MealFilterPage initialMeals={res.data} />
    
    </div>
  );
};

export default Meals;