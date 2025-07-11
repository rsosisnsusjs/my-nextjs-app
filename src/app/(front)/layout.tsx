import type { Metadata } from "next";
import "../globals.css";
import AppHeader from "@/components/app/AppHeader";

export const metadata: Metadata = {
  title: "Junior App",
  description: "Generated by Junior",
};

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <AppHeader />
        {children}
    </div>
  );
} 
