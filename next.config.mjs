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
                destination: '/categories?viewtype=main&page=0',
                permanent: true
            },
        ]
    },
};
export default nextConfig;
