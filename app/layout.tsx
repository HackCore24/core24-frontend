import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import NavBar from "@/modules/NavBar/NavBar";
import { headers } from "next/headers";

const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-un" });

export const metadata: Metadata = {
  title: "Ядро",
  description: "Делаем документооборот проще",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const excludedPages = ["/login", "/project/data_check"];
  if (excludedPages.includes(pathname || "")) {
    return (
      <html lang="ru" className={unbounded.variable}>
        <body className={unbounded.className}>{children}</body>
      </html>
    );
  } else {
    return (
      <html lang="ru" className={unbounded.variable}>
        <body className={unbounded.className}>
          <NavBar>{children}</NavBar>
        </body>
      </html>
    );
  }
}
