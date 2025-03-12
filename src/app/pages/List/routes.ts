import { Context } from "@/worker";
import { route } from "redwoodsdk/router";
import { link } from "../../shared/links";
import { List } from "./List";
import { Lists } from "./Lists";

function isAuthenticated({ ctx }: { ctx: Context }) {
  if (!ctx.user) {
    return new Response(null, {
      status: 302,
      headers: { Location: link("user/login") },
    });
  }
}
export const listRoutes = [route("/lists", [Lists]), route("/:id", [List])];
