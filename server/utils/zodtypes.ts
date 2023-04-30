import { z } from "zod";

export const User = z.object({
    username: z.string().min(8),
    password: z.string().min(8)
});