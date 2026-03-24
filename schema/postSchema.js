import z from "zod";
export const postSchema = z.object({
    title: z.string().trim().max(100).min(4),
    content: z.string().trim().max(1000).min(50)
})