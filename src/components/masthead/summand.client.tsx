import Link from "next/link";
import { FC } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Number from "./number.client";
import { Button } from "../ui/button";

const Summand: FC<{
  platform: string;
  count: number;
  url?: string;
  className?: string;
}> = ({ className, platform, count, url }) => {
  return (
    <TableRow className={`${className} `}>
      <TableCell>
        <Number n={count} />
      </TableCell>
      <TableCell>
        {url ? (
          <Button className="p-0 underline" asChild variant="link">
            <Link href={url} target="_blank">
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
