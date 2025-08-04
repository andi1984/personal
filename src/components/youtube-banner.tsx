import { FC } from "react";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const YoutubeBanner: FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 via-red-400 to-red-600 text-background p-8 shadow-lg">
      <div className="relative z-10 space-y-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
          <FaYoutube className="h-8 w-8" />
          Find me on YouTube
        </h2>
        <p className="text-lg">
          I share short videos about web development and gardening. No embedded player, just a simple link.
        </p>
        <Button
          asChild
          className="bg-white text-red-700 hover:bg-red-700 hover:text-white"
        >
          <Link
            href="https://www.youtube.com/@andi1984dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit my channel
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default YoutubeBanner;
