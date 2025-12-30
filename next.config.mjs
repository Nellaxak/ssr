/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    reactStrictMode: false,
    cacheHandler: require.resolve('./cache-handler.js'),
    cacheMaxMemorySize: 100, // 100mb
    /*basePath: '/categories',*/
    /*experimental: {
        exposeBusinessErrors: true,
    },*/
    //destination: '/categories?viewtype=main&page=0',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/page/0?viewtype=main',
                permanent: true
            },
        ]
    },
};
export default nextConfig;
