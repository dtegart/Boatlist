import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { authRoutes } from "@/app/pages/auth/routes";
import { User } from "@prisma/client";
import { index, layout, prefix } from "redwoodsdk/router";
import { defineApp } from "redwoodsdk/worker";
import { listRoutes } from "./app/pages/List/routes";
import { db, setupDb } from "./db";
import { Session } from "./session/durableObject";
import { sessions, setupSessionStore } from "./session/store";
export { SessionDurableObject } from "./session/durableObject";

export type Context = {
  session: Session | null;
  user: User | null;

};

export default defineApp<Context>([
  async ({ env, ctx, request }) => {
    await setupDb(env);
    setupSessionStore(env);
    ctx.session = await sessions.load(request);

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });
    }
  },
  layout(Document, [
    index([
      /* ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/user/login" },
          });
        }
      }, */
      Home,
    ]),
    prefix("/list", listRoutes),
    prefix("/user", authRoutes),
  ]),
]);
