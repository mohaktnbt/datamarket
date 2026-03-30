import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@dataforge/shared', '@dataforge/ui'],
};

export default nextConfig;
