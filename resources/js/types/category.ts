import { z } from 'zod'

export const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
})
export const categoriesSchema = z.array(categorySchema)
export type Category = z.infer<typeof categorySchema>
export type CategoryFormData = Pick<Category, 'name' | 'slug'>