const Page = async ({}) => {
  const api = await import("./api/follower/route");
  const response = await api.GET();
  const data = await response.json();
  return <h1>Counter: {data.total} Followers</h1>;
};

export default Page;
