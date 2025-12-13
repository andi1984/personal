import { getWebmentions, type Mention } from "@/lib/get-webmentions";

function Webmention({ mention }: { mention: Mention }) {
  // Switch case based on https://github.com/snarfed/bridgy/blob/f86503113e6d6a33552edc121b65c56b864353d8/blog_webmention.py#L203
  switch (mention["wm-property"]) {
    case "in-reply-to":
      // comment
      return (
        <a href={mention.url} target="_blank" rel="noopener noreferrer">
          {mention.author.name} commented: &quot;{mention.content.text}&quot;
        </a>
      );
    case "like-of":
      // Like
      return (
        <a
          href={mention.author.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {mention.author.name} liked this!
        </a>
      );
    default:
      // Repost case
      return (
        <a href={mention.url} target="_blank" rel="noopener noreferrer">
          {mention.author.name} reposted this!
        </a>
      );
  }
}

async function WebmentionsList({ slug }: { slug: string }) {
  const mentions = await getWebmentions(slug);

  // If there are no mentions or fetch failed, return null
  if (!mentions || mentions.length === 0) {
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
