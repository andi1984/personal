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

export type { Mention, WebmentionsFeed };

export async function getWebmentions(
  pathname: string
): Promise<Mention[] | null> {
  try {
    const targetUrl = `https://www.andi1984.dev/${pathname}/`;
    const apiUrl = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(targetUrl)}`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 60 * 60 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error("Failed to fetch webmentions:", res.statusText);
      return null;
    }

    const data = (await res.json()) as WebmentionsFeed;

    return data.children || [];
  } catch (error) {
    console.error("Error fetching webmentions:", error);
    return null;
  }
}
