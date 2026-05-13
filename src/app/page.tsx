import { BookmarkForm } from "@/components/BookmarkForm";
import { DeleteButton } from "@/components/DeleteButton";
import { prisma } from "@/lib/prisma";
import { Book } from "lucide-react";

export default async function Home() {
    const bookmarks = await prisma.bookmark.findMany();
    return (
        <main>
            <BookmarkForm />
            {bookmarks.map((bookmark) => (
                <div key={bookmark.id}>
                    <DeleteButton id={bookmark.id} />
                </div>
            ))}
        </main>
    );
}
