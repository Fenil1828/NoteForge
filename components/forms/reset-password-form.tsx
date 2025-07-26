"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"

// ✅ Removed unused import
// import { resendVerificationEmail } from "@/server/users"
import { toast } from "sonner"
import { Loader2 } from "lucide-react" // ✅ Removed unused Mail icon
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
  password: z.string().min(4, "Password must be at least 4 characters"),
  confirmPassword: z.string().min(4, "Password must be at least 4 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })
 
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // ✅ Removed unused handleResendVerification function

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)

      if (!token) {
        toast.error("Invalid or missing reset token");
        return;
      }

      const { error } = await authClient.resetPassword({
        newPassword: values.password,
        token: token,
      });
      
      if (!error) {
        toast.success("Password reset successfully! You can now login with your new password.")
        form.reset()
        router.push("/login")
      } else {
        toast.error(error.message)
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading || !token}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>

                {!token && (
                  <div className="text-sm text-destructive text-center">
                    Invalid reset link. Please request a new password reset.
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center text-sm">
                Remember your password?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Back to Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
