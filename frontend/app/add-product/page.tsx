"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Loader2
} from 'lucide-react'

// Zod validation schema
const addProductSchema = z.object({
    productName: z.string().min(1, { message: "Product name is required" }),
    productDescription: z.string().min(1, { message: "Product description is required" }),
    productPrice: z.string().min(1, { message: "Product price is required" }),
    productImage: z.string().url({ message: "Invalid image URL" }),
})

export default function AddProduct() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Initialize the form
    const form = useForm<z.infer<typeof addProductSchema>>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            productName: "",
            productDescription: "",
            productPrice: "",
            productImage: "",
        },
    })

    // Form submission handler
    const handleSubmit = async (values: z.infer<typeof addProductSchema>) => {
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include', // Include credentials in the request
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add product");
            }

            const data = await response.json()
            console.log("Add Product Response:", data)
            alert("Product added successfully!")

            // Redirect to the home page
            router.push('/')
        } catch (error) {
            console.error("Add Product Error:", error)
            alert((error as Error).message || "Failed to add product")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Add New Product</CardTitle>
                    <CardDescription>Enter product details to add a new product</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="productName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="productDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="productPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product price" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="productImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product image URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding Product...
                                    </>
                                ) : (
                                    "Add Product"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
