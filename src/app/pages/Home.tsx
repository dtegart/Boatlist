import { Header } from "@/app/pages/Header";
import { AllLists } from "@/components/SharedList/AllLists";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { Context } from "@/worker";
import { ListForm } from "./List/ListForm";


export async function Home({ ctx }: { ctx: Context }) {
  type List = {
    id: string;
    name: string;
  };

  const allLists = await db.list.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  }) as List[];

  // Get lists based on whether user is logged in
  const userLists = await db.list.findMany(
    ctx.user ? { where: { ownerId: ctx.user.id } } : undefined
  ) as List[];



  // if there is a user, return the user lists in a card, the new list form in a card and a link to browse lists
  if (ctx.user) {
    return (
      <>
        <Header ctx={ctx} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="h-full border-muted shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-muted-foreground">Your Lists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ListForm userId={ctx.user.id} />
                {userLists.length > 0 ? (
                  <ul>
                    {userLists.map((list) => (
                      <li key={list.id}>
                        <a href={`/list/${list.id}`}
                          className="block p-2 border-1 border-sea-light rounded-md text-muted-foreground bg-sail hover:bg-muted transition-colors duration-200"
                        >{list.name}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">You haven't created any lists yet.</p>
                )}
              </CardContent>
            </Card>

            <Card className="h-full border-muted shadow-sm">
              <CardHeader className="space-y-1 flex justify-between ">
                <div className="flex w-full justify-between items-center">
                  <CardTitle className="text-2xl text-muted-foreground">Top Lists</CardTitle>
                  <a href="list/lists" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    See All →
                  </a>
                </div>
              </CardHeader>
              <AllLists lists={allLists} emptyMessage="No Lists Available" />
            </Card>
          </div>
        </div>
      </>
    );
  }

  // if there is no user, return a card with all the lists and a card saying login / create account to make and save lists
  return (
    <>
      <Header ctx={ctx} />
      <div className="flex justify-center items-center min-h-screen p-4">
        <Card className="h-full border-muted shadow-sm">
          <CardHeader className="space-y-1 flex justify-between items-center">
            <div className="flex w-full justify-between items-center">
              <CardTitle className="text-2xl text-muted-foreground">Top Lists</CardTitle>
              <a href="list/lists" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                See All →
              </a>
            </div>
          </CardHeader>
          <AllLists lists={allLists} emptyMessage="No Lists Available" />
        </Card>
        <Card className="w-full max-w-md shadow-sm border-muted">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-muted-foreground">Create an Account</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">Login or create an account to make and save lists.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
