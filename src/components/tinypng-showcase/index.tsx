import { SiGithub } from "react-icons/si";

const TinyPNGShowcase = () => {
  return (
    <section className="my-20">
      {/* Top Divider */}
      <div className="mb-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
      </div>

      {/* Section Title */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Tools I&apos;ve Built
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Here is a selection of tools and extensions I&apos;ve developed to
          enhance developer productivity.
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Main Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 p-[2px] shadow-xl transition-all duration-300 hover:shadow-blue-500/25">
          {/* Inner card */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex flex-col items-center gap-6 p-6 md:flex-row md:gap-8">
              {/* Left side - Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  {/* Icon container with official VSCode logo */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-xl bg-white p-3 shadow-md transition-transform duration-300 group-hover:scale-105 dark:bg-slate-800">
                    <img
                      src="/vscode.svg"
                      alt="Visual Studio Code"
                      width={64}
                      height={64}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                {/* Title & Description */}
                <div>
                  <h3 className="mb-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    TinyPNG for VSCode
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    My VSCode extension for image compression.{" "}
                    <span className="font-medium">Powered by TinyPNG</span>{" "}
                    (with permission from{" "}
                    <a
                      href="https://tinypng.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      tinyjpg.com
                    </a>
                    ).
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=andi1984.tinypng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <img
                      src="/vscode.svg"
                      alt="VS Code"
                      width={16}
                      height={16}
                      className="h-4 w-4 brightness-0 invert transition-transform group-hover/btn:scale-110"
                    />
                    <span>VS Marketplace</span>
                  </a>

                  <a
                    href="https://github.com/andi1984/vscode-tinypng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <SiGithub className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="mt-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
      </div>
    </section>
  );
};

export default TinyPNGShowcase;
