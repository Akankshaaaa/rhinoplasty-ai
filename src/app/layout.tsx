import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RhinoplastyAI - Visualize Your Rhinoplasty Results",
  description: "Use AI to visualize potential rhinoplasty results on your photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
