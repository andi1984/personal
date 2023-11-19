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
            Hi everyone! I&apos;m excited to be here and learn along with all of
            you. I&apos;m based in south-west Germany, dabbling in web
            development with a focus on React and TypeScript.
          </p>

          <p>
            This space is where I&apos;ll share what I&apos;m learning, the
            challenges I face, and the little victories along the way. I&apos;m
            not an expert, but I believe in learning by doing and sharing that
            experience with others.
          </p>

          <h2>Here&apos;s What I&apos;ll Be Talking About:</h2>
          <ul>
            <li>📚 My learning journey with React and TypeScript.</li>
            <li>🛠️ Tips and tricks that I find useful or interesting.</li>
            <li>💡 Projects I&apos;m working on, no matter how small.</li>
            <li>🌈 Discussions on anything web development related.</li>
          </ul>

          <h2>If You&apos;re New Here:</h2>
          <p>
            Don&apos;t worry, so am I! We&apos;ll figure this out together.
            I&apos;ll share resources that I find helpful and hope they&apos;ll
            help you too.
          </p>

          <h2>It&apos;s Not All About Coding:</h2>
          <p>
            Besides coding, I love gardening and mentoring kids in coding. So,
            expect some fun detours and stories about these adventures.
          </p>

          <h2>Let&apos;s Learn and Grow Together!</h2>
          <p>
            I&apos;m here to connect, share, and learn. Feel free to join the
            conversation, share your thoughts, or just drop a hello. Let&apos;s
            support each other on this journey.
          </p>

          <p>
            Can&apos;t wait to see where we all go from here. Let&apos;s dive
            in! 🌊
          </p>
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
