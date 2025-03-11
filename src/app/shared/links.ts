import { defineLinks } from "redwoodsdk/router";

export const link = defineLinks([
  "/",
  "list/all",
  "/list/:id",
  "user/login",
  "user/logout",
]);
