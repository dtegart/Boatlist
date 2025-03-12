import { CardContent } from "@/components/ui/card";
import { SavedButton } from "./SavedButton";

export type ListType = {
    id: string;
    name: string;
    _count?: {
        savedBy: number;
    };
    savedBy: { id: string }[];
};

export function AllLists({ lists, emptyMessage, userId }: {
    lists: ListType[],
    emptyMessage: string,
    userId?: string
}) {
    console.log(lists[0].savedBy);
    return (
        <CardContent>
            {lists.length > 0 ? (
                <ul>
                    {lists.map((list) => (
                        <li key={list.id} className="mb-2">
                            <div className="flex items-center justify-between p-2 border-1 border-sea-light rounded-md text-muted-foreground bg-sail hover:bg-muted transition-colors duration-200">
                                <a href={`/list/${list.id}`}>
                                    {list.name}
                                </a>
                                <SavedButton
                                    savedCount={list._count?.savedBy ?? 0}
                                    listId={list.id}
                                    userId={userId || ''}
                                    isSaved={list.savedBy.some((user) => user.id === userId)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">{emptyMessage}</p>
            )}
        </CardContent>
    );
}
