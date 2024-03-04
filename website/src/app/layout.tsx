import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import DateRangeProvider from "../contexts/dateRange";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme.provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stratade",
  description: "Get trade statistics in minute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <DateRangeProvider>
        <html lang="en">
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </DateRangeProvider>
    </ReactQueryProvider>
  );
}
