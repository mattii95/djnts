import { z } from 'zod'
import { categorySchema } from './category'
import { tagsSchema } from './tag.type'

export const postSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    image: z.string(),
    posted: z.enum(['yes', 'not']),
    category_id: z.number(),
    user_id: z.number(),
    category: categorySchema,
    tags: tagsSchema,
    user: z.object({
        id: z.number(),
        email: z.string(),
        name: z.string(),
    }),
    created_at: z.string(),
    updated_at: z.string()
})

export const postsSchema = z.array(postSchema)

export type Post = z.infer<typeof postSchema>
export type PostFormData = Pick<Post, 'title' | 'slug' | 'description' | 'content' | 'image' | 'posted' | 'category_id' | 'tags'>
export type PostFormDataWithoutImage = Pick<Post, 'title' | 'slug' | 'description' | 'content' | 'posted' | 'category_id'>