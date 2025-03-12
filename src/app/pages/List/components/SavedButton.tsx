"use client"

import { saveList } from "@/app/pages/List/functions";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function SavedButton({ listId, userId }: { listId: string; userId: string }) {
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
            <span className="ml-1">{0}</span>
        </Button>
    );
}