/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    socialcount: {
      stale: 172800, // 2 days
      revalidate: 86400, // 1 day
      expire: 259200, // 3 days
    },
  },
  // https://github.com/pmndrs/react-spring/issues/2146#issuecomment-1743513157
  reactStrictMode: false,
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/*/*",
      },
    ],
  },
};

module.exports = nextConfig;
