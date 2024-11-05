import { z } from 'zod'
import { roleSchema } from './role.type'

const authSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
})

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    roles: z.array(roleSchema),
})

type Auth = z.infer<typeof authSchema>
type User = z.infer<typeof userSchema>

export type UserRoles = Pick<User, 'id' | 'name' | 'email' | 'roles'>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserTokenForm = Pick<Auth, 'token'>