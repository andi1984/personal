import React from "react";
import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const MastHead: FC = () => {
  return (
    <div className="header bg-cover bg-center text-white flex justify-center flex-row items-center content-center">
      <div className="flex flex-col text-center items-center content-center justify-center transition-all ease-in-out duration-700 md:bg-stone-200 p-4 rounded-3xl max-w-xs lg:max-w-md ">
        <Link href="/" className="group-hover:invisible">
          <h1
            className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
            data-aos="zoom-y-out"
          >
            Welcome to the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r   from-emerald-500 via-emerald-400 to-indigo-500">
              gardening 🌱 WebDev
            </span>
          </h1>
        </Link>

        <Link target="_blank" href="https://www.linkedin.com/in/andi1984/">
          <Button className="mt-4">Contact me</Button>
        </Link>
      </div>
    </div>
  );
};

export default MastHead;
