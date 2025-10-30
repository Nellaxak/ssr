/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    /*reactStrictMode: false,*/
    /*basePath: '/categories',*/
    /*experimental: {
        exposeBusinessErrors: true,
    },*/
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
