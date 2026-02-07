"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { CategoryData, categoryService } from "@/services/category.service";
import { mealService } from "@/services/meal.service";
import { createMeal, getAllMeals, updateMeal } from "@/action/meal.action";
import { getAllCategories } from "@/action/category.action";

interface Props {
    userId: string;
}

interface MealFormValues {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    isAvailable: boolean;
}

const ManageMeals = ({ userId }: Props) => {
    const [meals, setMeals] = useState<any[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loadingMeals, setLoadingMeals] = useState(false);
    const [saving, setSaving] = useState(false);

    const [editingMeal, setEditingMeal] = useState<any | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [showForm, setShowForm] = useState(false);

    /* ---------------- RHF ---------------- */
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<MealFormValues>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            categoryId: "",
            isAvailable: true,
        },
    });

    /* ---------------- Data fetch ---------------- */
    const fetchMeals = async () => {
        setLoadingMeals(true);
        const res = await getAllMeals();
        if (!res.error) {
            setMeals(res.data.filter((m: any) => m.userId === userId));
        }
        setLoadingMeals(false);
    };

    const fetchCategories = async () => {
        const res = await getAllCategories();
        if (!res.error) setCategories(res.data);
    };

    useEffect(() => {
        fetchMeals();
        fetchCategories();
    }, []);

    /* ---------------- Image upload ---------------- */
    const uploadToImgbb = async (file: File) => {
        const fd = new FormData();
        fd.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            { method: "POST", body: fd }
        );

        const data = await res.json();
        if (!data.success) throw new Error("Image upload failed");
        return data.data.url;
    };

    /* ---------------- Save (Create / Update) ---------------- */
    const onSubmit = async (values: MealFormValues) => {
        try {
            setSaving(true);

            let imageUrl = editingMeal?.image;
            if (imageFile) imageUrl = await uploadToImgbb(imageFile);

            const payload = {
                ...values,
                image: imageUrl,
                userId,
            };

            const res = editingMeal
                ? await updateMeal(editingMeal.id, payload)
                : await createMeal(payload);

            if (res.error) throw new Error(res.error.message);

            toast.success(editingMeal ? "Meal updated" : "Meal created");
            reset();
            setEditingMeal(null);
            setImageFile(null);
            setShowForm(false);
            fetchMeals();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    /* ---------------- Edit handler ---------------- */
    const handleEdit = (meal: any) => {
        setEditingMeal(meal);
        reset({
            name: meal.name,
            description: meal.description,
            price: meal.price,
            categoryId: meal.categoryId ?? "",
            isAvailable: meal.isAvailable ?? true,
        });
    };

    return (
        <>
            <div className="mb-6">
                <Button
                    onClick={() => {
                        reset();
                        setEditingMeal(null);
                        setImageFile(null);
                        setShowForm(true);
                    }}
                >
                    + Add Meal
                </Button>
            </div>

              {showForm && (
                <div className="border rounded-xl p-4 space-y-3 bg-gray-50">
                    <h2 className="text-lg font-semibold">
                        {editingMeal ? "Edit Meal" : "Create Meal"}
                    </h2>

                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            placeholder="Meal name"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}

                        <Textarea placeholder="Description" {...register("description")} />

                        <Input
                            type="number"
                            placeholder="Price"
                            {...register("price", {
                                required: true,
                                valueAsNumber: true,
                                min: 1,
                            })}
                        />

                        <Select
                            value={watch("categoryId")}
                            onValueChange={(val) => setValue("categoryId", val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id!}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        />

                        <label className="flex gap-2 items-center text-sm">
                            <input type="checkbox" {...register("isAvailable")} />
                            Available for order
                        </label>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={saving}>
                                {saving
                                    ? editingMeal
                                        ? "Updating..."
                                        : "Creating..."
                                    : editingMeal
                                        ? "Update Meal"
                                        : "Create Meal"}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowForm(false);
                                    reset();
                                    setEditingMeal(null);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {loadingMeals ? (
                <p>Loading meals...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {meals.map((meal) => (
                        <div key={meal.id} className="border rounded-xl p-4 space-y-2">
                            <h3 className="font-bold">{meal.name}</h3>
                            <p>{meal.description}</p>
                            <p>৳ {meal.price}</p>
                            <Button
                                size="sm"
                                onClick={() => {
                                    setEditingMeal(meal);
                                    reset({
                                        name: meal.name,
                                        description: meal.description,
                                        price: meal.price,
                                        categoryId: meal.categoryId ?? "",
                                        isAvailable: meal.isAvailable ?? true,
                                    });
                                    setShowForm(true);
                                }}
                            >
                                Edit
                            </Button>

                        </div>
                    ))}
                </div>
            )}

          
        </>
    );
};

export default ManageMeals;
