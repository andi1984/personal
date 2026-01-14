import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Merriweather, Caveat } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";

import { AudioPlayerProvider } from "@/contexts/audio-player-context";
import BackgroundAudioPlayer from "@/components/background-audio-player";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-handwritten",
});

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-sync" strategy="afterInteractive">
          {`
            (function () {
              var doc = document.documentElement;
              var theme = 'light';
              try {
                var stored = window.localStorage.getItem('theme');
                if (stored === 'dark' || stored === 'light') {
                  theme = stored;
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  theme = 'dark';
                }
              } catch (error) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  theme = 'dark';
                }
              }
              doc.classList.remove('light', 'dark');
              doc.classList.add(theme);
              doc.style.colorScheme = theme;
            })();
          `}
        </Script>
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
      <body
        className={`${inter.variable} ${merriweather.variable} ${caveat.variable} container font-sans`}
      >
        <AudioPlayerProvider>
          {children}
          <BackgroundAudioPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
