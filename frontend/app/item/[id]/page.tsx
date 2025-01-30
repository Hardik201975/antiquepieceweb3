"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ethers, BrowserProvider } from 'ethers';
import { Loader2, Maximize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  era: string;
  category: string;
  ownerWalletAddress: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = async () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      toast.error('Please log in first.', {
        position: "top-center",
        autoClose: 3000,
      });
      router.push('/login');
      return;
    }

    if (!product) return;

    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to use this feature.');
      return;
    }

    try {
      setTransactionLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Fetch current ETH rate
      const ethRateResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const ethRate = ethRateResponse.data.ethereum.usd;

      // Convert price to ETH using the current rate
      const ethAmount = ethers.parseUnits((Number(product.productPrice) / ethRate / 100).toFixed(18), 'ether');

      // Create transaction object
      const tx = {
        to: product.ownerWalletAddress,
        value: ethAmount
      };

      // Send transaction
      const transaction = await signer.sendTransaction(tx);
      
      // Wait for transaction to be mined
      const receipt = await transaction.wait();
      
      if (receipt?.status === 1) {
        alert('Payment successful! Transaction hash: ' + transaction.hash);
        // Here you could add API call to update product status or handle success
      } else {
        alert('Transaction failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during transaction:', error);
      alert('Transaction failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setTransactionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center p-4">Error loading product details.</div>;
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
          <Button 
            onClick={handleBuyNow} 
            className="mt-4"
            disabled={transactionLoading}
          >
            {transactionLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Buy Now'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}