"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'

interface UserInfo {
  username: string;
  email: string;
  walletAddress: string;
}

const MyInformation = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/me', { withCredentials: true })
        console.log(response)
        setUserInfo(response.data)
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  if (!userInfo) {
    return <div>Loading...</div>
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
