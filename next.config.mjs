/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    /*reactStrictMode: false,*/
    /*basePath: '/categories',*/
    /*experimental: {
        exposeBusinessErrors: true,
    },*/
    //destination: '/categories?viewtype=main&page=0',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/categories?viewtype=main&start=1&page=0',
                permanent: true
            },
        ]
    },
};
export default nextConfig;
