import z from "zod";
export const payload = z.object({
    body: z.object({
            title: z.string().trim().max(100).min(4),
            content: z.string().trim().max(1000).min(50)
        })
})

export const params = z.object({
    params: z.object({
        id: z.string()
    })
})