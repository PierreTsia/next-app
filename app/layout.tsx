import "./globals.css";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import ThemeProvider from "@/src/theme/ThemeProvider";
import { IconContext } from "react-icons";

const josefinSans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// fixes build error see https://github.com/vercel/next.js/issues/49373
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={josefinSans.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
