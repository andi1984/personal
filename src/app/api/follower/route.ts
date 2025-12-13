"use server";

type API_RESPONSE = { total: number };
export async function GET() {
  if (!process.env.FOLLOWER_API_ENDPOINT) {
    return Response.json({ total: 0 });
  }

  const res = await fetch(process.env.FOLLOWER_API_ENDPOINT, {
    next: { revalidate: 60 * 60 }, // Revalidate every hour
  });

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  const data = (await res.json()) as API_RESPONSE;

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
