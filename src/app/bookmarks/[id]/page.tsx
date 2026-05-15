import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BookmarkDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const bookmark = await prisma.bookmark.findUnique({
        where: { id },
    });
    if (!bookmark) notFound();
    return (
        <div>
            <h1 className="flex items-center justify-center h-screen font-bold">
                rien a voir ici, pas de details
            </h1>
        </div>
    );
}
