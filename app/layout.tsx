import type { Metadata } from "next";
import { SidebarFoldProvider } from "./components/SectionLayout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eshamittal.com"),
  title: "esha's website",
  description: "Portfolio of Esha Mittal.",
  openGraph: {
    type: "website",
    siteName: "esha's website",
    title: "esha's website",
    description: "Portfolio of Esha Mittal.",
    images: [
      {
        url: "https://eshamittal.com/share.png",
        width: 1200,
        height: 630,
        alt: "esha's website",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "esha's website",
    description: "Portfolio of Esha Mittal.",
    images: ["https://eshamittal.com/share.png"],
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
