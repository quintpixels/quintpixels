import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare, GeistPixelGrid } from "geist/font/pixel";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { ClientShell } from "@/components/ClientShell";
import { PagePreloader } from "@/components/PagePreloader";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://quintpixels.com"),
  title: "Quint Pixels — Creative Technology Studio",
  description:
    "A cinematic technology studio building products, systems, and experiences at the intersection of design and engineering.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/favicon/icon1.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/icon0.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/favicon/shortcut-icon.png",
    apple: [
      {
        url: "/favicon/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/apple-icon-dark.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        GeistSans.variable,
        GeistMono.variable,
        GeistPixelSquare.variable,
        GeistPixelGrid.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col grain" suppressHydrationWarning>
        <PagePreloader />
        <SmoothScrollProvider>
          <ClientShell />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
