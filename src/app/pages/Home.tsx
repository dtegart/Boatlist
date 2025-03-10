import { Card } from "@/components/ui/card";
import { db } from "@/db";
import { Context } from "@/worker";
import { ListForm } from "./List/ListForm";

export async function Home({ ctx }: { ctx: Context }) {
  type List = {
    id: string;
    name: string;
  };

  const allLists = await db.list.findMany() ?? [] as List[];

  // Get lists based on whether user is logged in
  const userLists = await db.list.findMany(
    ctx.user ? { where: { ownerId: ctx.user.id } } : undefined
  ) as List[];

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col items-center">
          {allLists.length > 0 ? (
            allLists.map((list) => (
              <Card key={list.id} className="p-4 w-full md:w-[500px] mb-4 border-0 shadow-sm">
                <a href={`/list/${list.id}`}>{list.name}</a>
              </Card>
            ))
          ) : (
            <Card className="p-4 w-full md:w-[500px] mb-4 border-0 shadow-sm text-center">
              No lists available yet.
            </Card>
          )}
        </div>
      </div>

      {ctx.user && (
        <div className="p-4">
          <div className="flex justify-center w-full mt-4">
            <Card className="p-4 w-full md:w-[500px] border-0">
              <ListForm userId={ctx.user.id} />
            </Card>
          </div>

          <h2 className="text-lg font-semibold text-center mt-6 mb-4">Your Lists</h2>

          <div className="flex flex-col items-center">
            {userLists.length > 0 ? (
              userLists.map((list) => (
                <Card key={list.id} className="p-4 w-full md:w-[500px] mb-4 border-0 shadow-sm">
                  <a href={`/list/${list.id}`}>{list.name}</a>
                </Card>
              ))
            ) : (
              <Card className="p-4 w-full md:w-[500px] mb-4 border-0 shadow-sm text-center">
                You don't have any lists yet.
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
