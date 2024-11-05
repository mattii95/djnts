import { z } from 'zod'

export const permissionSchema = z.object({
    id: z.number(),
    name: z.string(),
    guard_name: z.string(),
})
export const permissionsSchema = z.array(permissionSchema)
export type Permission = z.infer<typeof permissionSchema>
export type PermissionFormData = Pick<Permission, 'name'>
export type PermissionIdRol = {
    permission_id: string
}