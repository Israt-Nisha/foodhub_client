"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CategoryData, CategoryWithCount } from "@/services/category.service";
import { categoryService } from "@/services/category.service";
import CategoryForm from "./CatForm";


const CategoriesManage = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryData | null>(null);
  const [openForm, setOpenForm] = useState(false);

  /* ---------------- Fetch categories ---------------- */
  const fetchCategories = async () => {
    setLoading(true);

    const res = await categoryService.getAllCategories();

    if (!res.error && Array.isArray(res.data)) {
      setCategories(res.data as CategoryWithCount[]);
    } else {
      toast.error(res.error ?? "Failed to load categories");
    }

    setLoading(false);
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------------- Delete category ---------------- */
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      const res = await categoryService.deleteCategory(id);

      if (res.error) {
        throw new Error(res.error.message);
      }

      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    }
  };

  return (
    <>
      {/* Add category */}
      <div className="mb-6">
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setOpenForm(true);
          }}
        >
          + Add Category
        </Button>
      </div>

      {openForm && (
        <CategoryForm
          category={selectedCategory ?? undefined}
          onSaved={() => {
            setOpenForm(false);
            fetchCategories();
          }}
          onCancel={() => setOpenForm(false)}
        />
      )}

      {/* Category list */}
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border rounded-xl p-4 space-y-2"
            >
              <h3 className="font-bold">{category.name}</h3>

              <p className="text-sm text-gray-600">
                Slug: {category.slug}
              </p>
              <p className="text-sm text-gray-600">
                Meals:
                <span className="font-semibold ml-1">
                  {category._count?.meals ?? 0}
                </span>
              </p>


              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpenForm(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  disabled={(category._count?.meals ?? 0) > 0}
                >
                  Delete
                </Button>

              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoriesManage;
