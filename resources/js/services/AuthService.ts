import { isAxiosError } from "axios";
import clientAxios from "../config/axios";
import { UserLoginForm, userSchema, UserTokenForm } from "../types/auth.type";

export async function login(formData: UserLoginForm) {
    try {
        const { data } = await clientAxios.post('/api/auth/login', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkToken(formData: UserTokenForm) {
    try {
        const { data } = await clientAxios.post('/api/auth/check-token', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios('/api/user', config)
        const response = userSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function logout() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post('/api/auth/logout', null, config)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}