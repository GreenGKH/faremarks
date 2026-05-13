"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

type ActionResult = { success: true } | { success: false; error: string };

export async function deleteBookmark(id: string): Promise<ActionResult> {
    try {
        await prisma.bookmark.delete({ where: { id } });
    } catch (e) {
        console.error(e);
        return { success: false, error: "Erreur lors de la suppression" };
    }

    revalidatePath("/");
    return { success: true };
}
