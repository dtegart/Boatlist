import { AllLists } from "@/app/pages/List/components/AllLists";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { Context } from "@/worker";
import { Header } from "../Header";

export async function Lists({ ctx }: { ctx: Context }) {
    const user = ctx.user;
    const lists = await db.list.findMany({
        orderBy: {
            savedBy: {
                _count: 'desc'
            }
        },
        include: {
            _count: {
                select: {
                    savedBy: true
                }
            }
        }
    });

    return (
        <>
            <Header ctx={ctx} />
            <div className="container mx-auto px-4 py-8 flex justify-center">
                <Card className="h-full w-full lg:max-w-md border-muted shadow-sm">
                    <CardHeader className="space-y-1 flex justify-between ">
                        <div className="flex w-full justify-between items-center">
                            <CardTitle className="text-2xl text-muted-foreground">Top Lists</CardTitle>
                        </div>
                    </CardHeader>
                    <AllLists
                        lists={lists}
                        emptyMessage="No Lists Available"
                        userId={user?.id}
                    />
                </Card>
            </div>
        </>
    );
}

