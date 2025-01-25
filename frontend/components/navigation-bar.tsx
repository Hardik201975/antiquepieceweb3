// components/navigation-bar.tsx
"use client"

import Link from "next/link"
import { Button } from "./ui/button"

export function NavigationBar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Antique Treasures
        </Link>
        <div className="flex gap-4">
          <Link href="/items">
            <Button variant="ghost">Browse Items</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}