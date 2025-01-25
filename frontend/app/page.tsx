// app/page.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  ShoppingCart, 
  User, 
  Search 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Antique items data
const antiqueItems = [
  {
    id: 1,
    name: "Victorian Era Chair",
    description: "Exquisite hand-carved wooden chair from the late 19th century",
    price: 1200,
    era: "Victorian",
    image: "/api/placeholder/400/300",
    category: "Furniture"
  },
  {
    id: 2,
    name: "Art Deco Brass Lamp",
    description: "Elegant brass lamp with geometric design typical of the 1920s",
    price: 850,
    era: "Art Deco",
    image: "/api/placeholder/400/300",
    category: "Lighting"
  },
  {
    id: 3,
    name: "Vintage Pocket Watch",
    description: "Intricate Swiss-made pocket watch from early 1900s",
    price: 1500,
    era: "Edwardian",
    image: "/api/placeholder/400/300",
    category: "Timepieces"
  },
  {
    id: 4,
    name: "Renaissance Style Mirror",
    description: "Ornate gilded mirror with intricate frame design",
    price: 2200,
    era: "Renaissance Revival",
    image: "/api/placeholder/400/300",
    category: "Decorative"
  },
  {
    id: 5,
    name: "Mid-Century Modern Vase",
    description: "Sleek ceramic vase from the mid-20th century design movement",
    price: 450,
    era: "Mid-Century",
    image: "/api/placeholder/400/300",
    category: "Ceramics"
  },
  {
    id: 6,
    name: "Antique Persian Rug",
    description: "Hand-woven silk rug with intricate traditional patterns",
    price: 3500,
    era: "Late 19th Century",
    image: "/api/placeholder/400/300",
    category: "Textiles"
  }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter items based on search term
  const filteredItems = antiqueItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.era.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Antique Gallery
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search antiques..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Link href="/cart">
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Gallery Section */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Curated Antique Collection
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link href={`/item/${item.id}`} key={item.id}>
              <Card className="hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 right-4"
                  >
                    {item.era}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    ${item.price.toLocaleString()}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-xl">No antiques found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-6 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Antique Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}