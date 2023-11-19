import { FC } from "react";
import Summand from "./summand.client";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
const SocialMediaInfluence: FC<{
  count: {
    total: number;
    youtube: number;
    github: number;
    devto: number;
    mastodon: number;
  };
}> = ({ count }) => {
  return (
    <div className="max-w-3xl mx-auto my-4">
      <div
        className="text-xl text-gray-600 mb-8"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        <Table>
          <TableCaption>Follower breakdown based on platform</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Count</TableHead>
              <TableHead>Platform</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Summand
              platform="Dev.to"
              count={count.devto}
              url="https://dev.to/andi1984"
            />
            <Summand
              platform="Mastodon"
              count={count.mastodon}
              url="https://toot.cafe/@andi1984"
            />
            <Summand
              platform="Youtube"
              count={count.youtube}
              url="https://www.youtube.com/@andi1984dev"
            />
            <Summand
              platform="Github"
              count={count.github}
              url="https://github.com/andi1984"
            />
          </TableBody>
          <TableFooter>
            <Summand platform="the web" count={count.total} />
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default SocialMediaInfluence;
