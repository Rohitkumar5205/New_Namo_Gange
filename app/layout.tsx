import "./globals.css";
import { Inter } from "next/font/google";
import AppWrapper from "@/components/LayoutWrapper";
import FloatingContactWidget from "../components/FloatingContactWidget";
import SocialFixedBar from "../components/SocialFixedBar";
import logo from "@/public/logo.png";

const inter = Inter({ subsets: ["latin"] });

// RootLayout is a Server Component by default
import ToastProvider from "./providers/ToastProvider";
export const metadata = {
  title: "Namo Gange – Official Website",
  description: "Clean Ganga, Green India",
  metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: logo.src,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter?.className}>
        <ToastProvider />
        <AppWrapper>
          {children}
          <SocialFixedBar />
          <FloatingContactWidget />
        </AppWrapper>
      </body>
    </html>
  );
}
