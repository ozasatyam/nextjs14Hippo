import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  anyApiRouter: publicProcedure.query(({ ctx }) => {
    return {
      message: "Hello world!",
    };
  }),
})
export type AppRouter = typeof appRouter;
