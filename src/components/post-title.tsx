"use client";

import { unstable_ViewTransition as ViewTransition } from "react";

type PostTitleProps = {
  title: string;
  slug: string;
  type: "post" | "note";
};

export default function PostTitle({ title, slug, type }: PostTitleProps) {
  const transitionName = `${type}-title-${slug.replace(/\//g, "-")}`;

  return (
    <ViewTransition name={transitionName}>
      <h1>{title}</h1>
    </ViewTransition>
  );
}
