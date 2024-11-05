import { isAxiosError } from "axios";
import clientAxios from "../config/axios";

export async function getUsers() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios('/api/users', config);
        if (data) {
            return data.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserById(userId) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios(`/api/users/${userId}`, config);
        if (data) {
            return data.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Agregar Rol al Usuario
export async function addRolToUser({userId, formData}) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post(`/api/users/${userId}/assign-role`, formData, config);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Quitar Rol al Usuario
export async function removeRolToUser({userId, formData}) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post(`/api/users/${userId}/delete-role`, formData, config);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}