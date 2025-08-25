import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
export const metadata: Metadata = {
  title: "New Tab",
  description: "A brand new tab",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
