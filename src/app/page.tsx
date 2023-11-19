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
          <h2>Welcome to My Space: Where Web Development Meets Gardening</h2>
          <p>
            Hello and thanks for visiting! I&apos;m Andi, a dedicated senior
            frontend developer from the beautiful South-West of Germany.
            I&apos;m all about creating smooth and engaging web experiences with
            React, JavaScript, TypeScript, and CSS. But there&apos;s more to me
            than just code – I&apos;m also an avid gardener, finding parallels
            between nurturing plants and developing robust websites.
          </p>
        </section>

        <section>
          <h3>My Journey in Web Development and Gardening</h3>
          <ul>
            <li>
              <strong>React &amp; JavaScript Projects:</strong> Check out how I
              apply precision and creativity, much like in gardening, to my
              React and JavaScript projects.
            </li>
            <li>
              <strong>TypeScript and CSS:</strong> Discover the structured
              beauty in my code, reminiscent of a well-kept garden, thanks to
              TypeScript and modern CSS techniques.
            </li>
            <li>
              <strong>Insights and Growth:</strong> Just like in gardening, I
              believe in constant learning and growth in web development. Dive
              into my blog for thoughts, tips, and shared knowledge.
            </li>
          </ul>
        </section>

        <section>
          <h3>Connecting Online and in the Garden</h3>
          <p>
            While you&apos;ll find me coding and sharing knowledge across
            various online platforms, I also take time to step away from the
            screen and connect with nature in my garden. This balance keeps me
            creative and inspired:
          </p>
          <SocialMediaInfluence count={data} />
        </section>

        <section>
          <h3>Beyond the Code: Community, Nature, and Creativity</h3>
          <p>
            I love blending my coding skills with my passion for gardening.
            It&apos;s not just about nurturing plants; it&apos;s about nurturing
            ideas and relationships, whether it&apos;s through mentoring budding
            developers or collaborating on innovative projects.
          </p>
        </section>

        <section>
          <h3>Let&apos;s Grow Together!</h3>
          <p>
            Whether you&apos;re into tech, gardening, or both, I&apos;m eager to
            connect. Explore my site, follow me on my various channels, and
            let&apos;s share our journeys in both web development and the
            natural world.
          </p>
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
