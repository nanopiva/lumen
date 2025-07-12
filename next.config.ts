import type { NextConfig } from "next";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

if (!SUPABASE_URL) {
  console.warn(
    "⚠️  NEXT_PUBLIC_SUPABASE_URL no está definida. Las imágenes de Supabase podrían no cargarse."
  );
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE_URL ? new URL(SUPABASE_URL).hostname : "",
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
  },
};

export default nextConfig;
