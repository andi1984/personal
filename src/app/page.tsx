async function getData(): Promise<{ total: number }> {
  if (!process.env.FOLLOWER_API_ENDPOINT) {
    return { total: 0 };
  }

  const res = await fetch(process.env.FOLLOWER_API_ENDPOINT);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Page = async ({}) => {
  const res = await getData();
  return <h1>Counter: {res.total} Followers</h1>;
};

export default Page;
