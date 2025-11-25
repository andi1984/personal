import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import BackToHome from "@/components/back-button";
import MastHead from "@/components/masthead";
import Link from "next/link";

export default async function Impressum() {
  return (
    <div className="container">
      <main className="mx-auto max-w-6xl px-6 py-12 md:px-8 lg:px-12">
        <MastHead />

        {/* About Section */}
        <section className="mb-20 mt-12">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl bg-slate-50 p-8 md:p-12 dark:bg-slate-900">
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                {/* Avatar */}
                <div className="flex justify-center">
                  <Avatar className="h-64 w-64 ring-4 ring-slate-200 dark:ring-slate-800">
                    <AvatarImage alt="Personal Portrait" src="/ava.jpg" />
                  </Avatar>
                </div>

                {/* Info */}
                <div className="space-y-6 text-center md:text-left">
                  <div>
                    <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
                      Andreas Sander
                    </h1>
                    <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
                      Frontend Developer since 2012 with a hobby as gardener.
                    </p>
                  </div>

                  <div>
                    <Link
                      target="_blank"
                      href="https://www.linkedin.com/in/andi1984/"
                    >
                      <Button className="rounded-lg bg-slate-900 px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-lg dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
                        Contact Me
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CV Section */}
        <section className="mb-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-slate-50">
              Curriculum Vitae
            </h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <iframe
                src="https://andi1984.github.io/CV/"
                className="h-[calc(100vh-200px)] min-h-[600px] w-full border-0"
                title="CV"
              />
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className="mx-auto max-w-5xl">
          <BackToHome />
        </div>
      </main>
    </div>
  );
}
