"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Loader2, Maximize2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  era: string;
  category: string;
}

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart', { productId: id }, { withCredentials: true })
      if (response.status === 200) {
        alert('Product added to cart successfully!')
        router.push('/cart')
      } else {
        alert('Failed to add product to cart')
      }
    } catch (error) {
      console.error('Error adding product to cart:', error)
      alert('Failed to add product to cart')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return <div>Error loading product details.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{product.productName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <img src={product.productImage} alt={product.productName} className="w-full h-64 object-cover mb-4" />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="absolute top-2 right-2">
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0">
                <img src={product.productImage} alt={product.productName} className="w-full h-full object-cover" />
              </DialogContent>
            </Dialog>
          </div>
          <p><strong>Description:</strong> {product.productDescription}</p>
          <p><strong>Price:</strong> ${product.productPrice.toLocaleString()}</p>
          <p><strong>Era:</strong> {product.era}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <Button onClick={handleAddToCart} className="mt-4">Buy Now</Button>
        </CardContent>
      </Card>
    </div>
  )
}
