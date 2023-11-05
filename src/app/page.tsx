import MastHead from "@/components/masthead";
import { getAllPosts } from "@/lib/get_all_posts";
import Link from "next/link";

const Page = async ({}) => {
  const api = await import("./api/follower/route");
  const response = await api.GET();
  const data = await response.json();
  const posts = getAllPosts(["slug", "title", "description"]);
  const notes = getAllPosts(["slug", "title", "description"], "note");
  return (
    <>
      <MastHead count={data.total} />
      <nav>
        <ol className="grid grid-cols-4 gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 inline-flex items-center text-center text-black">
                      {post.title}
                    </div>
                    <p className="text-gray-700 text-base">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <nav>
        <ol className="grid grid-cols-4 gap-4">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 inline-flex items-center text-center text-black">
                      {note.title}
                    </div>
                    <p className="text-gray-700 text-base">
                      {note.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Page;
