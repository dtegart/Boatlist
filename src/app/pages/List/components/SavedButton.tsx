"use client"

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { saveList } from "../functions";

export function SavedButton({ listId, userId, savedCount }: { listId: string; userId: string, savedCount: number }) {

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
                await saveList(listId, userId);
            }}
            className="ml-2"
            disabled={!userId}
            title={!userId ? "Sign in to save lists" : "Save this list"}
        >
            <Heart className="h-4 w-4" />
            <span className="ml-1">{savedCount}</span>
        </Button>
    );
}