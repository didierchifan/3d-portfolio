/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      exclude: /node_modules/,
      use: [
        "raw-loader",
        {
          loader: "glslify-loader",
          options: {
            transform: [["glslify-hex", { "option-1": true, "option-2": 42 }]],
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
