"use client"
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { 
  Loader2 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import axios from 'axios'

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  era: string;
  category: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const observerTarget = useRef<HTMLDivElement>(null)

  const fetchProducts = useCallback(async () => {
    if (!hasMore || isLoading) return

    setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:5000/api/products`, {
        params: {
          page,
          limit: 9
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const newProducts: Product[] = response.data.products
      
      if (newProducts.length === 0 || response.data.message === 'No more products available') {
        setHasMore(false)
      } else {
        setProducts(prevProducts => {
          const uniqueProducts = [...prevProducts, ...newProducts].filter(
            (product, index, self) => 
              index === self.findIndex((p) => p._id === product._id)
          )
          return uniqueProducts
        })
        setPage(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
      setIsInitialLoading(false)
    }
  }, [page, hasMore, isLoading])

  useEffect(() => {
    // Initial load
    if (isInitialLoading) {
      fetchProducts()
    }
  }, [fetchProducts, isInitialLoading])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Only fetch more if the target is visible and we're not already loading
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchProducts()
        }
      },
      { 
        root: null,
        rootMargin: '200px',
        threshold: 0.1
      }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.disconnect()
      }
    }
  }, [fetchProducts, hasMore, isLoading])

  const filteredItems = products.filter(item => 
    (item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.era && item.era.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Curated Antique Collection
        </h1>

        {isInitialLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading Antiques...</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px]">
              {filteredItems.map((item) => (
                <div 
                  key={item._id}
                  className="opacity-100 transition-opacity duration-300"
                >
                  <Link href={`/item/${item._id}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 group">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={item.productImage} 
                          alt={item.productName} 
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
                        <h3 className="text-xl font-semibold mb-2">{item.productName}</h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {item.productDescription}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">
                          ${item.productPrice.toLocaleString()}
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>

            {/* Observer target for infinite scroll */}
            <div 
              ref={observerTarget}
              className="h-10 w-full"
            />

            {/* Loading Indicator */}
            {isLoading && hasMore && (
              <div className="w-full flex justify-center py-4">
                <div className="bg-primary/10 px-4 py-2 rounded-full flex items-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Loading more...</span>
                </div>
              </div>
            )}

            {/* No Products Messages */}
            {filteredItems.length === 0 && !isLoading && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-xl">No antiques found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}