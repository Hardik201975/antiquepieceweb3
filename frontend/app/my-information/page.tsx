"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  
  Loader2 
} from 'lucide-react'

interface UserInfo {
  username: string;
  email: string;
  walletAddress: string;
}

const MyInformation = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))
    if (!token) {
      toast.error('Please log in first.', {
        position: "top-center",
        autoClose: 3000,
      })
      router.push('/login')
      return
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/me', { withCredentials: true })
        setUserInfo(response.data)
      } catch (error) {
        console.error('Error fetching user info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [router])

  if (loading) {
    return (
    <div className="absolute bottom-0 left-0 w-full flex justify-center py-4">
    <div className="bg-primary/10 px-4 py-2 rounded-full flex items-center space-x-2">
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <span className="text-muted-foreground">Loading more...</span>
    </div>
  </div>
  )
  }

  if (!userInfo) {
    return <div>Error loading user information.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Information</h1>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Wallet Address:</strong> {userInfo.walletAddress}</p>
    </div>
  )
}

export default MyInformation
