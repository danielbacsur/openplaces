import { type NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config: NextConfig = {
  devIndicators: false,
  reactCompiler: true,
};

export default withMDX(config);
