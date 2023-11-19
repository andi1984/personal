import React from "react";
import { FC } from "react";

const MastHead: FC = () => {
  return (
    <header>
      {/* Illustration behind hero content */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-12 md:pt-20 md:pb-20">
        <div className="bg-gradient-to-r rounded-2xl lg:from-zinc-50  lg:to-stone-50">
          <div className="relative lg:custom-bg bg-cover bg-right-bottom p-4 ">
            <div className="text-center pb-12 md:pb-16">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Welcome to the{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r   from-emerald-500 via-emerald-400 to-indigo-500">
                  gardening 🌱 WebDev
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default MastHead;
