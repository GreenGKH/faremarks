import { BookmarkForm } from "@/components/BookmarkForm";
import { DeleteButton } from "@/components/DeleteButton";
import { prisma } from "@/lib/prisma";
import { Book } from "lucide-react";

export default async function Home() {
    const bookmarks = await prisma.bookmark.findMany();
    return (
        <main className="max-w-xl mx-auto p-6 flex flex-col gap-6">
            <BookmarkForm />
            {bookmarks.map((bookmark) => (
                <div key={bookmark.id}>
                    <ul className="flex flex-col gap-3">
                        <li>
                            <a href={bookmark.url} className="pr-10">
                                {bookmark.title}
                            </a>
                            <p className="text-sm text-gray-500">
                                {bookmark.description}
                            </p>
                            <DeleteButton id={bookmark.id} />
                        </li>
                    </ul>
                </div>
            ))}
        </main>
    );
}
