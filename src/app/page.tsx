import AllPostsList from "@/components/list/posts";
import MastHead from "@/components/masthead";
import { getAllPosts } from "@/lib/get_all_posts";

const Page = async ({}) => {
  const api = await import("./api/follower/route");
  const response = await api.GET();
  const data = await response.json();
  const posts = getAllPosts(["slug", "title", "date", "description"]);
  const notes = getAllPosts(["slug", "title", "date", "description"], "note");
  return (
    <main>
      <MastHead count={data} />
      <AllPostsList title="All posts" posts={posts} type="post" />
      <AllPostsList title="All notes" posts={notes} type="note" />
    </main>
  );
};

export default Page;
