"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { CreateBookmarkInput, CreateBookmarkSchema } from "@/lib/schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function createBookmark(
    input: CreateBookmarkInput,
): Promise<ActionResult> {
    const parsed = CreateBookmarkSchema.safeParse(input);
    if (!parsed.success) {
        return { success: false, error: parsed.error.message };
    }
    console.log(parsed.data);
    try {
        await prisma.bookmark.create({ data: parsed.data });
    } catch (e) {
        console.error(e);
        return { success: false, error: "Erreur lors de la création" };
    }

    revalidatePath("/");
    return { success: true };
}
