import MastHead from "@/components/masthead";

const Page = async ({}) => {
  const api = await import("./api/follower/route");
  const response = await api.GET();
  const data = await response.json();
  return (
    <>
      <MastHead count={data.total} />
    </>
  );
};

export default Page;
