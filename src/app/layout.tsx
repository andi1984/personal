import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andi1984",
  description: "Frontend dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="webmention"
          href="https://webmention.io/www.andi1984.dev/webmention"
        />
        <link
          rel="pingback"
          href="https://webmention.io/www.andi1984.dev/xmlrpc"
        />
        <meta name="fediverse:creator" content="@andi1984@toot.cafe" />
      </head>
      <body className={`${nunito.className} container`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
