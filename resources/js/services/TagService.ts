import { isAxiosError } from "axios";
import clientAxios from "../config/axios";
import { Tag, TagFormData, tagsSchema, tagSchema } from '../types/tag.type';

type TagServiceType = {
    tagId: Tag['id'],
    formData: TagFormData
}


export async function getTags() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios('/api/tag', config);
        const result = tagsSchema.safeParse(data.data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addTag(formData: TagFormData) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post('/api/tag', formData, config);
        if (data) {
            return data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTagById(tagId: Tag['id']) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios(`/api/tag/${tagId}`, config);
        const result = tagSchema.safeParse(data.data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTag({ tagId, formData }: TagServiceType) { 
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.put(`/api/tag/${tagId}`, formData, config);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTag(tagId: Tag['id']) { 
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.delete(`/api/tag/${tagId}`, config);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}