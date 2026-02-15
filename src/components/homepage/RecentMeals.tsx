
import MealsGrid from "../meals/MealsGrid";
import { mealService } from "@/services/meal.service";



const RecentMeal = async () => {
    const res = await mealService.getAllMeals({ limit: 4 });
    
    return (
        <section className="container mx-auto px-4 py-16 space-y-8">
            <div className="flex items-center text-center justify-center">
                <div className="space-y-4 mb-2 text-center">
                    <h2 className="text-3xl font-bold">Recent Meals</h2>
                    <p className="text-muted-foreground">
                        Freshly added meals from our providers
                    </p>
                </div>

            </div>

            <MealsGrid meals={res.data} />
        </section>
    );
};

export default RecentMeal;
