import { isAxiosError } from "axios";
import clientAxios from "../config/axios";
import { Role, RoleFormData } from "../types/role.type";
import { PermissionIdRol } from "../types/permission.type";
type RoleServiceType = {
    rolId: Role['id'],
    formData: RoleFormData
}


export async function getRoles() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios('/api/roles', config);
        if (data) {
            return data.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addRol(formData: RoleFormData) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post('/api/roles', formData, config);
        if (data) {
            return data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getRolById(rolId: Role['id']) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios(`/api/roles/${rolId}`, config);
        if (data) {
            return data.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateRol({ rolId, formData }: RoleServiceType) { 
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.put(`/api/roles/${rolId}`, formData, config);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteRol(rolId: Role['id']) { 
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.delete(`/api/roles/${rolId}`, config);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getPermissionsByRol(rolId: Role['id']) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios(`/api/roles/${rolId}/permission`, config);
        if (data) {
            return data.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type PermissionRolServiceType = {
    rolId: Role['id'],
    formData: PermissionIdRol
}
export async function addPermissionToRol({ rolId, formData }: PermissionRolServiceType) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post(`/api/roles/${rolId}/assign-permission`, formData, config);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removePermissionToRol({ rolId, formData }: PermissionRolServiceType) {
    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    try {
        const { data } = await clientAxios.post(`/api/roles/${rolId}/delete-permission`, formData, config);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
