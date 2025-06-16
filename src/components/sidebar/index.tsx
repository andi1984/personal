import { FC } from "react";
import Link from "next/link";
import { FaMastodon, FaGithub, FaDev, FaYoutube } from "react-icons/fa";

const Sidebar: FC = () => {
  return (
    <div className="space-y-4 p-4 text-sm text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Connect</h2>
      <ul className="space-y-2">
        <li>
          <Link href="https://toot.cafe/@andi1984" target="_blank" className="flex items-center gap-2 hover:underline">
            <FaMastodon /> Mastodon
          </Link>
        </li>
        <li>
          <Link href="https://github.com/andi1984" target="_blank" className="flex items-center gap-2 hover:underline">
            <FaGithub /> GitHub
          </Link>
        </li>
        <li>
          <Link href="https://dev.to/andi1984" target="_blank" className="flex items-center gap-2 hover:underline">
            <FaDev /> Dev.to
          </Link>
        </li>
        <li>
          <Link href="https://www.youtube.com/@andi1984dev" target="_blank" className="flex items-center gap-2 hover:underline">
            <FaYoutube /> YouTube
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
