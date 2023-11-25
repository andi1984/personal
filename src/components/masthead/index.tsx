"use client";
import classNames from "classnames";
import React, { useState } from "react";
import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const MastHead: FC = () => {
  const mediaQueryList = window.matchMedia("(min-width: 800px)");
  const [isLarge, setIsLarge] = useState(mediaQueryList.matches);
  mediaQueryList.addEventListener("change", (event) => {
    return setIsLarge(event.matches);
  });

  const conditonalClassNames = classNames({ group: isLarge });
  return (
    <div className="header relative bg-cover bg-center text-white">
      <div
        className={`${conditonalClassNames} backdrop-blur-lg container mx-auto p-6 text-center hover:backdrop-blur-none transition-all ease-in-out duration-700`}
      >
        <Link href="/" className="group-hover:invisible">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 "
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
