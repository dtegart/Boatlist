"use client"

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { saveList } from "../functions";

export function SavedButton({ listId, userId, savedCount, isSaved }: {
    listId: string;
    userId: string;
    savedCount: number;
    isSaved: boolean;
}) {
    console.log(isSaved);
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
                await saveList(listId, userId);
            }}
            className="ml-2 hover:bg-sea-medium"
            disabled={!userId}
            title={!userId ? "Sign in to save lists" : "Save this list"}
        >
            {isSaved ? (
                <Heart fill="red" className="h-4 w-4 text-red-500" />
            ) : (
                <Heart className="h-4 w-4" />
            )}
            <span className="ml-1">{savedCount}</span>
        </Button>
    );
}