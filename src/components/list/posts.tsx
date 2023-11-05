import { Items, Types } from "@/lib/types";
import { FC } from "react";
import BlogPostCard from "../card";

const AllPostsList: FC<{
  title: string;
  posts: Items[];
  type: Types;
}> = ({ title, posts, type }) => {
  return (
    <>
      <h2>{title}</h2>
      <nav>
        <ol className="flex flex-col gap-1 md:gap-2 md:grid md:grid-cols-2 lg:gap-3 lg:grid-cols-3 xl:gap-4 xl:grid-cols-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogPostCard post={post} type={type} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default AllPostsList;
