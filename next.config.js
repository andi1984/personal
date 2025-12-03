/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
