// // app/layout.tsx
// import { ThemeProvider } from "@/components/theme-provider"
// import { NavigationBar } from "@/components/navigation-bar"

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <ThemeProvider>
//           <NavigationBar />
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Antique Gallery',
  description: 'Curated Antique Collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}