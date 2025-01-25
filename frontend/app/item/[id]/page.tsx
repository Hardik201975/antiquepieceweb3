// app/items/[id]/page.tsx

"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ethers } from "ethers"
import { useState } from "react"

export default function ItemDetail({ params }: { params: { id: string } }) {
  const [isPaying, setIsPaying] = useState(false)

  const handlePayment = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask")
      return
    }

    try {
      setIsPaying(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      // Replace with your smart contract interaction
      const tx = await signer.sendTransaction({
        to: "YOUR_WALLET_ADDRESS",
        value: ethers.parseEther("0.5")
      })
      
      await tx.wait()
      alert("Payment successful!")
    } catch (error) {
      console.error(error)
      alert("Payment failed")
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <img src="/placeholder/600/400" alt="Item" className="w-full rounded-lg" />
            <div>
              <h1 className="text-3xl font-bold mb-4">Victorian Chair</h1>
              <p className="text-gray-600 mb-4">
                This exquisite Victorian chair dates back to 1875. Features original
                upholstery and intricate wooden carvings.
              </p>
              <div className="mb-6">
                <p className="text-2xl font-bold">0.5 ETH</p>
              </div>
              <Button 
                className="w-full" 
                onClick={handlePayment}
                disabled={isPaying}
              >
                {isPaying ? "Processing..." : "Pay with ETH"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}