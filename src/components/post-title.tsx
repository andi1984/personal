"use client";

import { ViewTransition } from "react";

type PostTitleProps = {
  title: string;
  slug: string;
  type: "post" | "note";
};

/**
 * Title component for blog posts and notes detail pages.
 * Wraps the title in a ViewTransition for smooth animations
 * when navigating from the list view.
 *
 * The transition name must match the one used in BlogPostCard.
 */
export default function PostTitle({ title, slug, type }: PostTitleProps) {
  const transitionName = `${type}-title-${slug.replace(/\//g, "-")}`;

  return (
    <ViewTransition name={transitionName}>
      <h1>{title}</h1>
    </ViewTransition>
  );
}
