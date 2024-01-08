import { z } from "zod";

export const QueryValidator = z.object({
    category: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    limit: z.number().optional()
})
export type TqueryValidator = z.infer<typeof QueryValidator>