import { AuthCredntialValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
    createPayloadUser: publicProcedure.input(AuthCredntialValidator).mutation(async ({ input }) => {
        const { email, password } = input
        console.log(email)
        const payload = await getPayloadClient()

        const { docs: users } = await payload.find({
            collection: "users",
            where: { email: { equals: email } }
        })
        console.log(users, "user")
        if (users.length !== 0)
            throw new TRPCError({ code: "CONFLICT" })
        
        await payload.create({
            collection: "users",
            data: {
                email,
                password,
                role: "user"
            }
        })
        return { success: true, sentToEmail: email }
    })
})