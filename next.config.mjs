/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    basePath: '/categories/',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/categories/main',
                permanent: true
            },
        ]
    },
};
export default nextConfig;
