import React from "react";
import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaSquareRss } from "react-icons/fa6";
import DarkModeToggle from "../dark-mode-toggle";

const MastHead: FC = () => {
  return (
    <div className="header relative flex items-center justify-center text-foreground landing-fade-up">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-400 to-indigo-600 opacity-70 gradient-luminosity"></div>
      <div className="relative flex flex-col text-center items-center content-center justify-center transition-all ease-in-out duration-700 md:bg-muted/80 backdrop-blur-sm p-4 rounded-3xl max-w-xs lg:max-w-md ">
        <Link href="/" className="group-hover:invisible">
          <h1
            className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
            data-aos="zoom-y-out"
          >
            Welcome to the{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r   from-emerald-500 via-emerald-400 to-indigo-500">
              gardening 🌱 WebDev
            </span>
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
