import { z } from 'zod'

export const tagSchema = z.object({
    id: z.number(),
    name: z.string(),
})
export const tagsSchema = z.array(tagSchema)
export type Tag = z.infer<typeof tagSchema>
export type TagFormData = Pick<Tag, 'name'>