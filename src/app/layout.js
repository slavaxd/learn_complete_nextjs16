import { cookies } from "next/headers";
import './globals.css'
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeProvider from "@/context/ThemeContext";
import ToasterClient from "@/components/ToasterClient";

export const metadata = {
  title: "Learn Next.js 16",
  description: "Next.js is FUN!",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? 'dark';
  const isDark = theme === "dark";

  return (
    <html
      lang="en"
      className={isDark ? "dark" : ""}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <Navigation />

          <main className="grow p-6">{children}</main>

          <Footer />
        </ThemeProvider>

        <ToasterClient />
      </body>
    </html>
  );
}
