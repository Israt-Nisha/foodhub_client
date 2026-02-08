"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { mealService } from "@/services/meal.service";
import { categoryService, CategoryData } from "@/services/category.service";
import { MealCreateInput, MealData } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


// Enums
const cuisines = ["BENGALI","INDIAN","CHINESE","ITALIAN","THAI"] as const;
const dietaries = ["VEG","NON_VEG","VEGAN","HALAL"] as const;

// Zod schema
const mealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(1, "Price must be > 0"),
  categoryId: z.string().min(1, "Category is required"),
  cuisine: z.enum(cuisines),
  dietary: z.enum(dietaries),
  isAvailable: z.boolean(),
});

type FormValues = z.infer<typeof mealSchema>;

interface Props {
  userId: string;
  meal?: MealData;
  onSaved: () => void;
  onCancel: () => void;
}

export default function MealForm({ userId, meal, onSaved, onCancel }: Props) {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

   useEffect(() => {
    (async () => {
      const { data, error } = await categoryService.getAllCategories();
      if(!error) setCategories(data);
    })();
  }, []);

  const { register, handleSubmit, watch } = useForm<FormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: meal?.name || "",
      description: meal?.description || "",
      price: meal?.price || 0,
      categoryId: meal?.categoryId || "",
      cuisine: meal?.cuisine || "INDIAN",
      dietary: meal?.dietary || "VEG",
      isAvailable: meal?.isAvailable ?? true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);

      let imageUrl = meal?.imageUrl || undefined;
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: fd }
        );
        const data = await res.json();
        if (!data.success) throw new Error("Image upload failed");
        imageUrl = data.data.url;
      }

      // Build payload
      const payload: MealCreateInput = { ...values, userId, imageUrl };
      console.log("payload:", payload);

      const result = meal
        ? await mealService.updateMeal(meal.id!, payload)
        : await mealService.createMeal(payload);
      
      console.log("result:", result);

      if (result.error) throw new Error(result.error.message);

      toast.success(meal ? "Meal updated" : "Meal created");
      onSaved();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{meal ? "Edit Meal" : "Create Meal"}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <label>Name</label>
          <Input {...register("name")} />
        </div>

        <div>
          <label>Description</label>
          <Textarea {...register("description")} />
        </div>

        <div>
          <label>Price</label>
          <Input type="number" {...register("price", { valueAsNumber: true })} />
        </div>

        <div>
          <label>Category</label>
          <select {...register("categoryId")}>
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Cuisine</label>
          <select {...register("cuisine")}>
            {cuisines.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Dietary</label>
          <select {...register("dietary")}>
            {dietaries.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("isAvailable")} />
            Available for order
          </label>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button onClick={onCancel} variant="outline" disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={saving}>
          {saving ? (meal ? "Updating..." : "Creating...") : meal ? "Update Meal" : "Create Meal"}
        </Button>
      </CardFooter>
    </Card>
  );
}
