import { isAxiosError } from "axios";
import clientAxios from "../config/axios";
import { Post, postSchema, postsSchema } from "../types/post.type";

export async function getPosts() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios('/api/post/all-posts', config);
        const result = postsSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function createPost(formData: FormData) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',  // Define que es un FormData
        },
    }
    try {
        const { data } = await clientAxios.post('/api/post', formData, config)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getPostById(postId: Post['id']) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios(`/api/post/${postId}`, config)
        const result = postSchema.safeParse(data.data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

type PostServiceType = {
    formData: FormData
    postId: Post['id']
}
export async function updatePost({ formData, postId }: PostServiceType) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post(`/api/post/${postId}`, formData, config)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deletePost(postId: Post['id']) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.delete(`/api/post/${postId}`, config)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getPostsByPosted() {
    try {
        const { data } = await clientAxios('/api/post/get-posts-posted');
        const result = postsSchema.safeParse(data.data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}