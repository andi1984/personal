"use client";
import { useState, useEffect } from "react";

type Mention = {
  type: "entry";
  author: {
    type: string;
    name: string;
    url: string;
    photo: string;
  };
  url: string;
  published: string;
  "wm-received": string;
  "wm-id": number;
  content: {
    text: string;
    html: string;
  };
  "mention-of": string;
  "wm-property": string;
  "wm-private": boolean;
};
type WebmentionsFeed = {
  type: string;
  name: string;
  children: Mention[];
};
function Webmention({ mention }: { mention: Mention }) {
  // Switch case based on https://github.com/snarfed/bridgy/blob/f86503113e6d6a33552edc121b65c56b864353d8/blog_webmention.py#L203
  switch (mention["wm-property"]) {
    case "in-reply-to":
      // comment
      return (
        <a href={mention.url} target="_blank">
          {mention.author.name} commented: &quot;{mention.content.text}&quot;
        </a>
      );
    case "like-of":
      // Like
      return (
        <a href={mention.author.url} target="_blank">
          {mention.author.name} liked this!
        </a>
      );
    default:
      // Repost case
      return (
        <a href={mention.url} target="_blank">
          {mention.author.name} reposted this!
        </a>
      );
  }
}

function WebmentionsList() {
  const [mentions, setMentions] = useState<Mention[]>([]);

  useEffect(() => {
    // TODO: FIX URL.
    // 1. Fetch the webmentions.io API endpoint
    fetch(
      `https://webmention.io/api/mentions.jf2?target=https://www.andi1984.dev${window.location.pathname}/`
    )
      .then((res) => res.json())
      .then((data: WebmentionsFeed) => {
        if (data.children) {
          setMentions([...mentions, ...data.children]);
        }
      });
  }, []);

  //2. Returned a rendered list if there are any mentions
  if (!mentions.length) {
    return null;
  }

  return (
    <>
      <h2>Webmentions</h2>
      <ol>
        {mentions.map((mention) => (
          <li key={mention["wm-id"]}>
            <Webmention mention={mention} />
          </li>
        ))}
      </ol>
    </>
  );
}

export default WebmentionsList;
