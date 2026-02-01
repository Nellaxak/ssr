/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nextConfig = {
    distDir: 'build',
    reactStrictMode: false,
    cacheHandler: require.resolve('./src/cache-handler.js'),
    cacheMaxMemorySize: 100, //mb
    /*basePath: '/categories',*/
    /*experimental: {
        exposeBusinessErrors: true,
    },*/
    //destination: '/categories?viewtype=main&page=0',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/categories?viewtype=main&page=0&scroll=start',
                permanent: true
            },
        ]
    },
};
export default nextConfig;
