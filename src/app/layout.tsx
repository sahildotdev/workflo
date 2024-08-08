import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Trello-Style Task Management App",
  description:
    "A simple task management app built with Next.js, Express, and MongoDB.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
