"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { deleteBookmark } from "@/actions/bookmarks/delete";
import { toast } from "sonner";

export function DeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            onClick={() =>
                startTransition(async () => {
                    const result = await deleteBookmark(id);
                    result.success
                        ? toast.success("Supprimé")
                        : toast.error(result.error);
                })
            }
        >
            Supprimer
        </Button>
    );
}
