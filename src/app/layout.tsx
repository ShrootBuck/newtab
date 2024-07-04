import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "New Tab",
  description: "Zayd Krunz's new tab page.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-background text-foreground dark`}
    >
      <body>{children}</body>
    </html>
  );
}
