import MastHead from "@/components/masthead";
import { getAllPosts } from "@/lib/get_all_posts";
import Link from "next/link";

const Page = async ({}) => {
  const api = await import("./api/follower/route");
  const response = await api.GET();
  const data = await response.json();
  const posts = getAllPosts(["slug", "title"]);
  return (
    <>
      <MastHead count={data.total} />
      <nav>
        <ol>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Page;
