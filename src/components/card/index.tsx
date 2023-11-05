import React, { FC } from "react";
import Link from "next/link";
import { Items, Types } from "@/lib/types";

const BlogPostCard: FC<{ post: Items; type: Types }> = ({ post, type }) => {
  const { slug, title, date, description } = post;
  // Formats the date string to a more readable format.
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
      <Link
        className="font-bold text-xl mb-2 hover:text-blue-600 transition duration-300"
        href={`/${type}s/${slug}`}
      >
        {title}
      </Link>
      <p>{description}</p>
      <p className="text-gray-700 text-base">
        Posted on <time dateTime={date}>{formatDate(date)}</time>
      </p>
    </div>
  );
};

export default BlogPostCard;
