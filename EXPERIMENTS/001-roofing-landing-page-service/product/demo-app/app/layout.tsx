import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roofing Landing Page Demo System",
  description:
    "Reusable roofing landing page demo system with prospect-specific data and assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
