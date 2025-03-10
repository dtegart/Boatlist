import { db } from "@/db";
import { Context } from "@/worker";
import { ListForm } from "./ListForm";

export async function Lists({ ctx }: { ctx: Context }) {
    const user = ctx.user;
    const lists = await db.list.findMany({
        where: {
            ownerId: user.id
        }
    });

    return (
        <div>
            <h1>Your Lists</h1>
            <ListForm userId={ctx.user?.id} />
            <ul>
                {lists.map((list) => (
                    <li key={list.id}>
                        <a href={`/list/${list.id}`}>{list.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

