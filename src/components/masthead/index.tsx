import React from "react";
import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaSquareRss } from "react-icons/fa6";
import DarkModeToggle from "../dark-mode-toggle";

const MastHead: FC = () => {
  return (
    <div className="header relative flex items-center justify-center py-8">
      <div className="flex flex-col text-center items-center content-center justify-center p-6 max-w-xs lg:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg md:shadow-lg">
        <Link href="/">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-900 dark:text-slate-50">
            Welcome to the gardening 🌱 WebDev
          </h1>
        </Link>

        <section className="flex flex-col gap-2 md:flex-row items-center mt-4">
          <Link href="/rss.xml">
            <Button className="rss-button">
              <FaSquareRss className="mr-2 h-4 w-4" /> RSS
            </Button>
          </Link>
          <Link target="_blank" href="/about">
            <Button className="">About me</Button>
          </Link>
          <DarkModeToggle />
        </section>
      </div>
    </div>
  );
};

export default MastHead;
