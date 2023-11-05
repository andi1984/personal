import Link from "next/link";
import { FC } from "react";
import Number from "./number.client";
const SubPart: FC<{
  count: {
    total: number;
    youtube: number;
    github: number;
    devto: number;
    mastodon: number;
  };
}> = ({ count }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="text-xl text-gray-600 mb-8"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        Frontend dev reaching <Number n={count.total} /> people on the web.
      </div>
      <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
        <div>
          Join <Number n={count.devto} /> people on{" "}
          <Link
            className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
            href="https://dev.to/andi1984"
            target="_blank"
          >
            Dev.to
          </Link>
        </div>
        <div>
          Join <Number n={count.mastodon} /> people on{" "}
          <Link
            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
            href="https://toot.cafe/@andi1984"
            target="_blank"
          >
            Mastodon
          </Link>
        </div>
        <div>
          Join <Number n={count.youtube} /> people on{" "}
          <Link
            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
            href="https://www.youtube.com/@andi1984dev"
            target="_blank"
          >
            Youtube
          </Link>
        </div>
        <div>
          Join <Number n={count.github} /> people on{" "}
          <Link
            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
            href="https://github.com/andi1984"
            target="_blank"
          >
            Github
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubPart;
