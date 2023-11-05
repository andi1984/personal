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
      <small className="block text-gray-700 text-base">
        <time dateTime={date}>{formatDate(date)}</time>
      </small>
      <Link
        className="font-bold text-xl mb-2 transition duration-300"
        href={`/${type}s/${slug}`}
      >
        {title}
      </Link>
      <p>{description}</p>
    </div>
  );
};

export default BlogPostCard;
