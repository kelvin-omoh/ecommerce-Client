/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 's.gravatar.com',
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
            }
        ],
    },
};


export default nextConfig;
