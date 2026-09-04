import type { Metadata } from "next";
import { SidebarFoldProvider } from "./components/SectionLayout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eshamittal.com"),
  title: "esha's website",
  description: "Portfolio of Esha Mittal.",
  openGraph: {
    type: "website",
    url: "https://eshamittal.com",
    siteName: "esha's website",
    title: "esha's website",
    description: "Portfolio of Esha Mittal.",
    images: [
      {
        url: "/og.png?v=2",
        width: 1200,
        height: 630,
        alt: "esha's website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "esha's website",
    description: "Portfolio of Esha Mittal.",
    images: ["/og.png?v=2"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SidebarFoldProvider>{children}</SidebarFoldProvider>
      </body>
    </html>
  );
}
