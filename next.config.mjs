/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/categories/main',
                permanent: false
            },
        ]
    },
};
export default nextConfig;
