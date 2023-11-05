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
        <ol className="grid grid-cols-4 gap-4">
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
