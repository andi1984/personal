import React, { FC } from "react";
import Link from "next/link";
import { Items, Types } from "@/lib/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BlogPostCard: FC<{ post: Items; type: Types }> = ({ post, type }) => {
  const { slug, title, date, description } = post;
  // Formats the date string to a more readable format.
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined);
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          <Link
            className="font-bold text-xl mb-2 transition duration-300"
            href={`/${type}s/${slug}`}
          >
            {title}
          </Link>
        </CardTitle>
        <CardDescription>
          <small>
            <time dateTime={date}>{formatDate(date)}</time>
          </small>
        </CardDescription>
      </CardHeader>
      {description && <CardContent>{description}</CardContent>}
    </Card>
  );
};

export default BlogPostCard;
