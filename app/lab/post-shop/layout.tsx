import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Post Shop",
  description: "Make a letter, pick your paper and stamp, and post it to someone.",
};

export default function PostShopLayout({ children }: { children: ReactNode }) {
  return children;
}
