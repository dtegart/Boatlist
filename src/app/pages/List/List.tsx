import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/db";
import { Context } from "@/worker";
import { RouteContext } from "redwoodsdk/router";

import { Header } from "../Header";
import { DeleteList } from "./components/DeleteList";
import { Item } from "./components/Item";
import { ItemForm } from "./components/ItemForm";
import { SavedButton } from "./components/SavedButton";

interface ListItem {
  id: string;
  description: string;
}

export async function List({ params, ctx }: RouteContext<{ id: string }> & { ctx: Context }) {
  const user = ctx.user;

  const list = await db.list.findUnique({
    where: { id: params.id },
    include: { items: true, savedBy: true },
  });

  if (!list) {
    return <div className="container mx-auto py-8 px-4">List not found</div>;
  }

  return (
    <>
      <Header ctx={ctx} />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center">
          <Card className="w-full md:w-[550px] shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between border-b border-wood-light">
              <h3 className="text-lg font-semibold">{list.name}</h3>
              {user && (list.ownerId === user.id ? (
                <DeleteList id={list.id} />
              ) : (
                <SavedButton
                  listId={list.id}
                  savedCount={list.savedBy.length}
                  userId={user.id}
                  isSaved={list.savedBy.some(saved => saved.userId === user.id)}
                />
              ))}
            </CardHeader>

            <CardContent className="p-6">
              {list.items.length > 0 ? (
                <ul className="space-y-3 ">
                  {list.items.map((item: ListItem) => (

                    <Item key={item.id} id={item.id} description={item.description} />

                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 mb-4">
                  <p className="text-gray-500 italic">This list is empty.</p>
                  <p className="text-sm text-gray-400 mt-1">Add your first item below!</p>
                </div>
              )}

              {user && list.ownerId === user.id && (
                <div className="mt-4 pt-4 border-t border-wood-light">
                  <ItemForm listId={list.id} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
