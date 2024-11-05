import { isAxiosError } from "axios";
import clientAxios from "../config/axios";
import { permissionsSchema } from "../types/permission.type";


export async function getPermissions() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios('/api/permissions', config);
        const result = permissionsSchema.safeParse(data.data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}