/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    //webpack rule for handling GLSL files
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

    // Add webpack rule for handling SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
