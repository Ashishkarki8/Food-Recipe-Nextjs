// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disable strict mode
    images: {
      domains: ['img.buzzfeed.com','s3.amazonaws.com','example.com'], // Add the domain of the external image
    },
  };
  export default nextConfig; 
 // Use CommonJS export in next.config.js
