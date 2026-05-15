"use client";

import { useForm } from "@tanstack/react-form";
import { useTransition } from "react";
import { toast } from "sonner";
import { createBookmark } from "@/actions/bookmarks/create";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateBookmarkSchema } from "@/lib/schema";

export function BookmarkForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        defaultValues: { url: "", title: "", description: "" },
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

            <form.Field name="title">
                {(field) => (
                    <div>
                        <Label htmlFor={field.name}>Titre</Label>
                        <Input
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Mon titre"
                        />
                        {field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-red-500">
                                {field.state.meta.errors[0]?.message}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            <form.Field name="description">
                {(field) => (
                    <div>
                        <Label htmlFor={field.name}>Description</Label>
                        <Input
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Ma description"
                        />
                        {field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-red-500">
                                {field.state.meta.errors[0]?.message}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            <Button type="submit" disabled={isPending}>
                {isPending ? "..." : "Ajouter"}
            </Button>
        </form>
    );
}
