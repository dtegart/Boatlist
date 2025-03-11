import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type List = {
    id: string;
    name: string;
};

export function AllLists({ lists, title }: { lists: List[], title: string }) {
    return (
        <Card className="h-full border-muted shadow-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {lists.length > 0 ? (
                    <ul>
                        {lists.map((list) => (
                            <li key={list.id}>
                                <a href={`/list/${list.id}`}>{list.name}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground">No lists available.</p>
                )}
            </CardContent>
        </Card>
    );
}
