import { createFileRoute } from "@tanstack/react-router";

type API_RESPONSE = { total: number };

export const Route = createFileRoute("/api/follower")({
  server: {
    handlers: {
      GET: async () => {
        if (!process.env.FOLLOWER_API_ENDPOINT) {
          return new Response(JSON.stringify({ total: 0 }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        const res = await fetch(process.env.FOLLOWER_API_ENDPOINT);
        const data = (await res.json()) as API_RESPONSE;

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
