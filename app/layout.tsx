import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI密码生成器 | 安全密码一键生成",
  description: "使用AI密码生成器创建安全、随机的密码，支持自定义长度和字符类型",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
