import { FC } from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const Metadata: FC<{ devto?: string; date?: string }> = ({ devto, date }) => {
  if (!devto && !date) {
    return null;
  }

  return (
    <aside className="sm:flex sm:flex-row gap-3 md:bg-muted px-3 py-3 rounded-md">
      {devto && (
        <Badge className="block my-2 text-center">
          <Link href={devto} target="_blank">
            Read on DevTo
          </Link>
        </Badge>
      )}
      {date && (
        <Badge variant="secondary" className="block my-2 text-center">
          Published on {new Date(date).toDateString()}
        </Badge>
      )}
    </aside>
  );
};

export default Metadata;
