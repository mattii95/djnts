import { isAxiosError } from "axios";
import clientAxios from "../config/axios";
import { categoriesSchema, Category, CategoryFormData, categorySchema } from "../types/category";

export async function getCategoriesAll() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios('/api/category/all', config);
        const result = categoriesSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addCategory(formData: CategoryFormData) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post('/api/category', formData, config)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getCategoryById(categoryId: Category['id']) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios(`/api/category/${categoryId}`, config);
        const result = categorySchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type CategoryServiceType = {
    formData: CategoryFormData,
    categoryId: Category['id']
}
export async function updateCategory({ formData, categoryId }: CategoryServiceType) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.put(`/api/category/${categoryId}`, formData, config)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}


export async function deleteCategory(categoryId: Category['id']) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.delete(`/api/category/${categoryId}`, config);
        const result = categorySchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}