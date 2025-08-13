import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Johan Stahl - Director",
  description:
    "Johan Stahl is a skilled visual storyteller and director that balances disarming humanity and razor-sharp technique with the ability to naturally tell fun fast paced emotional stories.",
  keywords: [
    "director",
    "film",
    "commercial",
    "advertising",
    "visual storytelling",
    "Johan Stahl",
  ],
  authors: [{ name: "Johan Stahl" }],
  openGraph: {
    title: "Johan Stahl - Director",
    description: "Skilled visual storyteller and director",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johan Stahl - Director",
    description: "Skilled visual storyteller and director",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
