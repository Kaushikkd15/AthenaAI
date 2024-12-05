
import { ClerkProvider } from "@clerk/nextjs";
import {Plus_Jakarta_Sans} from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/context/theme.provider";
import { Toaster } from "@/Components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({subsets: ['latin']})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
      suppressHydrationWarning={true}
        className={jakarta.className}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}