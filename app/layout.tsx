import "@/app/globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-neutral-950 min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
