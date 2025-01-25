// components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ValidAttribute = "class" | "data-theme" | `data-${string}`

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: ValidAttribute | ValidAttribute[] | undefined
  defaultTheme?: string | undefined
  enableSystem?: boolean | undefined
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute as ValidAttribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}