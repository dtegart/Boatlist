import { CardContent } from "@/components/ui/card";

type List = {
    id: string;
    name: string;
};

export function AllLists({ lists, emptyMessage }: { lists: List[], emptyMessage: string }) {
    return (

        <CardContent>
            {lists.length > 0 ? (
                <ul>
                    {lists.map((list) => (
                        <li key={list.id} className="mb-2">
                            <a
                                href={`/list/${list.id}`}
                                className="block p-2 border-1 border-sea-light rounded-md text-muted-foreground bg-sail hover:bg-muted transition-colors duration-200"
                            >
                                {list.name}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">{emptyMessage}</p>
            )}
        </CardContent>

    );
}
