import { defineScript } from "redwoodsdk/worker";
import { db, setupDb } from "../db";

export default defineScript(async ({ env }) => {
  setupDb(env);

  await db.$executeRawUnsafe(`\
    DELETE FROM List;
    DELETE FROM sqlite_sequence;
  `);

  const user = await db.user.findFirstOrThrow({
    where: {
      username: "dtegart",
    },
  });
  /*  await db.list.create({
    data: {
      name: "Med Mooring",
      ownerId: user.id,
    },
  }); */
  console.log("🌱 Finished seeding");
});
