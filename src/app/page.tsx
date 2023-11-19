import AllPostsList from "@/components/list/posts";
import MastHead from "@/components/masthead";
import { getAllPosts } from "@/lib/get_all_posts";
import SocialMediaInfluence from "@/components/influence";
import Link from "next/link";

const Page = async ({}) => {
  const api = await import("./api/follower/route");
  const response = await api.GET();
  const data = await response.json();
  const posts = getAllPosts(["slug", "title", "date", "description"]);
  const notes = getAllPosts(["slug", "title", "date", "description"], "note");
  return (
    <>
      <a
        href="#posts"
        className="absolute left-[-9999px] focus:left-0 focus:top-0 focus:z-50 focus:p-4 focus:m-4 focus:bg-white focus:border focus:border-gray-500"
      >
        Skip to Main Content
      </a>

      <main>
        <MastHead />
        <section>
          <h2>Welcome!</h2>
          <p>
            Through this platform, I aim to share my insights, experiences, and
            tips in web development. Whether you&apos;re a seasoned pro or just
            starting your journey, I believe we all have something valuable to
            learn from each other.
          </p>

          <h2>What to Expect:</h2>
          <ul>
            <li>📚 Regular posts on best practices in React and TypeScript.</li>
            <li>🛠️ Tips and tricks to enhance your coding skills.</li>
            <li>💡 Sharing personal projects and learning experiences.</li>
            <li>
              🌈 Engaging discussions on the latest web development trends.
            </li>
          </ul>

          <h2>For the Beginners:</h2>
          <p>
            Fear not! I&apos;ll also be providing resources and guidance for
            those who are new to coding. Remember, every expert was once a
            beginner!
          </p>

          <h2>Beyond Coding:</h2>
          <p>
            As a gardening enthusiast and a mentor to kids at coderdojos, I
            occasionally share insights from these experiences and how they
            intertwine with my tech life.
          </p>

          <h2>Let&apos;s Connect & Grow Together!</h2>
          <p>
            Feel free to ask questions, share your work, or just say hi.
            Let&apos;s build a supportive community where we all can grow and
            succeed together.
          </p>

          <p>Looking forward to this exciting journey with you all!</p>
          <p>Happy Coding! 🚀</p>
          <br />
          <p>I am also active on other social media platforms:</p>
          <SocialMediaInfluence count={data} />
        </section>
        <section id="posts">
          <AllPostsList title="All posts" posts={posts} type="post" />
        </section>
        <section id="notes">
          <AllPostsList title="All notes" posts={notes} type="note" />
        </section>
      </main>
      <footer>
        <Link href="/impressum">Imprint & Privacy statement</Link>
      </footer>
    </>
  );
};

export default Page;
