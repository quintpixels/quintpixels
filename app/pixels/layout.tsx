import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Quint Pixels",
  description: "CMS Dashboard",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-admin
      className="min-h-screen bg-[#f7f5f2] text-[#0b0b0a] overflow-x-hidden"
    >
      {children}
    </div>
  );
}
