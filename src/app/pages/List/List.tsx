import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/db";

import { RouteContext } from "redwoodsdk/router";
import { DeleteList } from "./DeleteList";
import { Item } from "./Item";
import { ItemForm } from "./ItemForm";

interface ListItem {
  id: string;
  description: string;
}

export async function List({ params }: RouteContext<{ id: string }>) {


  const list = await db.list.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!list) {
    return <div className="container mx-auto py-8 px-4">List not found</div>;
  }

  return (

    <div className="container mx-auto py-8 px-4">

      <div className="flex flex-col items-center">
        <Card className="w-full md:w-[550px] shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between border-b border-wood-light">
            <h3 className="text-lg font-semibold">{list.name}</h3>
            <DeleteList id={list.id} />
          </CardHeader>

          <CardContent className="p-6">
            {list.items.length > 0 ? (
              <ul className="space-y-3 mb-6">
                {list.items.map((item: ListItem) => (
                  <li key={item.id} className=" pb-3 last:border-0">
                    <Item id={item.id} description={item.description} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 mb-4">
                <p className="text-gray-500 italic">This list is empty.</p>
                <p className="text-sm text-gray-400 mt-1">Add your first item below!</p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-wood-light">
              <ItemForm listId={list.id} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}
