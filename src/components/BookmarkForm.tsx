"use client";

import { useForm } from "@tanstack/react-form";
import { useTransition } from "react";
import { toast } from "sonner";
import {
    createBookmark,
    CreateBookmarkSchema,
} from "@/actions/bookmarks/create";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BookmarkForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        defaultValues: { url: "", title: "" },
        validators: { onChange: CreateBookmarkSchema },
        onSubmit: ({ value }) => {
            startTransition(async () => {
                const result = await createBookmark(value);
                if (result.success) {
                    toast.success("Bookmark ajouté");
                    form.reset();
                } else {
                    toast.error(result.error);
                }
            });
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="flex flex-col gap-3"
        >
            <form.Field name="url">
                {(field) => (
                    <div>
                        <Label htmlFor={field.name}>URL</Label>
                        <Input
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="https://..."
                        />
                        {field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-red-500">
                                {field.state.meta.errors[0]?.message}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            {/* À toi : champ title */}

            <Button type="submit" disabled={isPending}>
                {isPending ? "..." : "Ajouter"}
            </Button>
        </form>
    );
}
