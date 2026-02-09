"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { categoryService, CategoryData } from "@/services/category.service";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ---------------- Zod schema ----------------
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

type FormValues = z.infer<typeof categorySchema>;

interface Props {
  category?: CategoryData;
  onSaved: () => void;
  onCancel: () => void;
}

export default function CategoryForm({
  category,
  onSaved,
  onCancel,
}: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
    },
  });

  /* -------- Auto-generate slug from name -------- */
  const nameValue = watch("name");
  React.useEffect(() => {
    if (!category) {
      const slug = nameValue
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [nameValue, category, setValue]);

  /* ---------------- Submit ---------------- */
  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);

      let imageUrl = category?.imageUrl || undefined;

      // Upload image if selected
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

      const payload: CategoryData = {
        ...values,
        imageUrl,
      };

      const result = category?.id
        ? await categoryService.updateCategory(category.id, payload)
        : await categoryService.createCategory(payload);

      if (result.error) throw new Error(result.error.message);

      toast.success(category ? "Category updated" : "Category created");
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          {category ? "Edit Category" : "Create Category"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <label>Name</label>
          <Input {...register("name")} />
        </div>

        <div>
          <label>Slug</label>
          <Input {...register("slug")} />
        </div>

        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files?.[0] || null)
            }
          />
        </div>

        {category?.imageUrl && (
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-32 object-cover rounded-md"
          />
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
        >
          {saving
            ? category
              ? "Updating..."
              : "Creating..."
            : category
            ? "Update Category"
            : "Create Category"}
        </Button>
      </CardFooter>
    </Card>
  );
}
