import BackButton from "@/components/back-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default async function Impressum() {
  return (
    <>
      <BackButton />
      <header className="bg-muted p-6 md:p-12">
        <div className="max-w-5xl lg:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
      <main className="max-w-5xl lg:max-w-6xl mx-auto my-8 px-6 md:px-0">
        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Education</h2>
          <Card>
            <CardHeader>
              <h3 className="font-bold text-xl">Saarland University</h3>
              <p className="text-muted-foreground">2010 - 2012</p>
            </CardHeader>
            <CardContent>
              <p>Master of Science in Computer Science</p>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <h3 className="font-bold text-xl">Saarland University</h3>
              <p className="text-muted-foreground">2004 - 2011</p>
            </CardHeader>
            <CardContent>
              <p>
                I started by studying to become a teacher for grammar schools,
                specialising in computer science and mathematics. I completed
                all the necessary qualifications for a possible 1st state
                examination. However, due to personal doubts about my
                suitability as a teacher, I switched to the bachelor&apos;s
                system with computer science as my main subject and maths as a
                minor subject and initially graduated with a bachelor&apos;s
                degree.
              </p>
            </CardContent>
          </Card>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Side Projects</h2>
          <Card>
            <CardHeader>
              <h3 className="font-bold text-xl">
                <Link href="https://social.saarland" target="_blank">
                  social.saarland
                </Link>
              </h3>
            </CardHeader>
            <CardContent>
              <p className="mt-2">
                I believe in the Fediverse and would like to make a contribution
                in the form of my own Mastodon server. The instance has been
                around for several years.
              </p>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <h3 className="font-bold text-xl">
                <Link href="https://coderdojo-saar.de" target="_blank">
                  CoderDojo Saarland
                </Link>
              </h3>
            </CardHeader>
            <CardContent>
              <p>
                I have used to be an organizing part in the #coderdojo movement
                since 2016. Lately I changed gears from organizaton to
                mentoring-only.
              </p>
              <p className="mt-1">
                It is amazing what young people come up with as their projects
                and it is great to give some experience back to the youth.
              </p>
            </CardContent>
          </Card>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Work Experience</h2>
          <Card className="mb-4">
            <CardHeader>
              <h3 className="font-bold text-xl">Digital Science GmbH</h3>
              <p className="text-muted-foreground">2016 - present</p>
            </CardHeader>
            <CardContent>
              <p>Frontend Developer</p>
              <p className="mt-2">
                Actively developing, maintaining{" "}
                <a href="https://dimensions.ai" target="_blank">
                  Dimensions
                </a>{" "}
                and related web products.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="font-bold text-xl">Moltomedia GmbH & Co.KG</h3>
              <p className="text-muted-foreground">2012 - 2015</p>
            </CardHeader>
            <CardContent>
              <p>Developer</p>
              <p className="mt-2">
                Responsible for front-end development with PHP, CSS JavaScript,
                Typo3
              </p>
            </CardContent>
          </Card>
        </section>
        <section>
          <h2 className="text-2xl font-medium mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>HTML</Badge>
            <Badge>CSS</Badge>
            <Badge>JavaScript</Badge>
            <Badge>React</Badge>
            <Badge>Node.js</Badge>
            <Badge>A11Y, Section 508, WCAG AA</Badge>
            <Badge>Gitlab CI</Badge>
            <Badge>Docker</Badge>
            <Badge>Kubernetes</Badge>
          </div>
        </section>
      </main>
    </>
  );
}
