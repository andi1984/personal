import { createRootRoute, Outlet, HeadContent, Scripts } from "@tanstack/react-router";
import { AudioPlayerProvider } from "@/contexts/audio-player-context";
import BackgroundAudioPlayer from "@/components/background-audio-player";

import "@/styles/globals.css";

const themeScript = `
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
`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "Frontend dev" },
      { name: "fediverse:creator", content: "@andi1984@toot.cafe" },
    ],
    links: [
      { rel: "webmention", href: "https://webmention.io/www.andi1984.dev/webmention" },
      { rel: "pingback", href: "https://webmention.io/www.andi1984.dev/xmlrpc" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap",
      },
    ],
    scripts: [
      {
        id: "theme-sync",
        children: themeScript,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="container font-sans">
        <AudioPlayerProvider>
          <Outlet />
          <BackgroundAudioPlayer />
        </AudioPlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
