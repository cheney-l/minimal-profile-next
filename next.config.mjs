const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const defaultBasePath = repoName && !repoName.endsWith(".github.io") ? `/${repoName}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.GITHUB_ACTIONS ? defaultBasePath : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined
};

export default nextConfig;
