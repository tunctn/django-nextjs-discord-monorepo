import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
const font = Inter({ subsets: ["latin"] });

import "@/styles/globals.scss";

import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Footer } from "./footer";
import { Providers } from "./providers";
import { Topbar } from "./topbar";

export const metadata: Metadata = {
  title: "Django - Discord - Next.js - PostgreSQL",
  description:
    "Created by Tunç Türkmen to demo a fullstack web app using Django, Next.js, Postgres and Discord.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          font.className,
          "h-full min-h-screen flex-col font-sans text-foreground/80 antialiased dark:text-foreground/95",
        )}
      >
        <ThemeProvider attribute="class">
          <div
            className="flex h-full min-h-screen w-full flex-col"
            suppressHydrationWarning
          >
            <Providers>
              <Topbar />
              <div className="flex h-full grow flex-col bg-muted/30">
                {children}
              </div>
              <Footer />
              <Toaster />
            </Providers>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
