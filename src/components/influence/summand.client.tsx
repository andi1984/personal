import Link from "next/link";
import { FC } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { FaMastodon, FaYoutube, FaDev, FaGithub } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import Number from "./number.client";
import { Button } from "../ui/button";

const getSoMeIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "mastodon":
      return FaMastodon;
    case "youtube":
      return FaYoutube;
    case "dev.to":
      return FaDev;
    case "github":
      return FaGithub;
    default:
      return IoShareSocialOutline;
  }
};
const Summand: FC<{
  platform: string;
  count: number;
  url?: string;
  className?: string;
}> = ({ className, platform, count, url }) => {
  const Icon = getSoMeIcon(platform);
  return (
    <TableRow className={`${className}`}>
      <TableCell>
        <Number n={count} />
      </TableCell>
      <TableCell>
        {url ? (
          <Button className="p-0 underline" asChild variant="link">
            <Link href={url} target="_blank">
              <Icon className="mr-1 fill-current" />
              {platform}
            </Link>
          </Button>
        ) : (
          platform
        )}
      </TableCell>
    </TableRow>
  );
};

export default Summand;
