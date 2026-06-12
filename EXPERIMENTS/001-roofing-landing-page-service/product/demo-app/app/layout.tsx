import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Final Cut Roofing | Free Roof Inspection",
  description: "Schedule a free roof inspection for hail, wind, leak, or storm damage concerns.",
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
