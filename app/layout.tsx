import type { Metadata } from "next";
import { SidebarFoldProvider } from "./components/SectionLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "esha's website",
  description: "Portfolio of Esha Mittal.",
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
