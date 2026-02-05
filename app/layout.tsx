import "./globals.css";
import { Inter } from "next/font/google";
import AppWrapper from "@/components/LayoutWrapper";
import FloatingContactWidget from "../components/FloatingContactWidget";
import SocialFixedBar from "../components/SocialFixedBar";

const inter = Inter({ subsets: ["latin"] });

// RootLayout is a Server Component by default
import ToastProvider from "./providers/ToastProvider";
export const metadata = {
  title: "Namo Gange – Official Website",
  description: "Clean Ganga, Green India",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter?.className}>
        <AppWrapper>
          <ToastProvider />
          {children}
          <SocialFixedBar />
          <FloatingContactWidget />
        </AppWrapper>
      </body>
    </html>
  );
}
