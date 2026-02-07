"use server";


import { CategoryData, categoryService } from "@/services/category.service";




export const getAllCategories = async () => {
  return await categoryService.getAllCategories()
};

export const createCategory = async (data:CategoryData) => {
  const res = await categoryService.createCategory(data)
 
  return res;
};


export const updateCategory = async (id: string, data: CategoryData) => {
    const res = await categoryService.updateCategory(id, data);
    return res;
}