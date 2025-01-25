import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Lock, Mail } from "lucide-react"
import Link from 'next/link'

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-sm text-slate-500">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  id="email" 
                  placeholder="name@example.com" 
                  type="email" 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <Button variant="link" className="text-sm px-0">
                Forgot password?
              </Button>
            </div>

            <Button className="w-full">Sign in</Button>
          </form>

          
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <Link href="/signup">
              <Button variant="link" className="p-0">Sign up</Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}