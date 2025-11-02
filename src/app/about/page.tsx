import BackButton from "@/components/back-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Impressum() {
  return (
    <>
      <BackButton />
      <header className="bg-muted p-6 md:p-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center md:justify-start">
            <Avatar className="h-64 w-64">
              <AvatarImage alt="Personal Portrait" src="/ava.jpg" />
            </Avatar>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Andreas Sander
            </h1>
              <p className="text-muted-foreground text-lg mb-6">
              Frontend Developer since 2012 with a hobby as gardener.
            </p>
            <div className="space-x-4">
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/andi1984/"
              >
                <Button className="px-4 py-2" variant="outline">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <iframe
        src="https://andi1984.github.io/CV/"
        className="w-full h-[calc(100vh-400px)] min-h-[600px] border-0"
        title="CV"
      />
    </>
  );
}
