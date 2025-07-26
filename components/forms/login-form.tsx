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
import { useState, useEffect } from "react"

import { signInUser, resendVerificationEmail } from "@/server/users"
import { toast } from "sonner"
import { Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
})

// ✅ Google Icon Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

// ✅ GitHub Icon Component
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fill="currentColor"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </svg>
)

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  
  // ✅ Added URL params handling
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const redirect = searchParams.get('redirect')
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  const router = useRouter();

  // ✅ Added toast messages based on URL parameters
  useEffect(() => {
    if (message === 'login-required') {
      toast.error("Please login to access the dashboard", {
        description: "You need to be authenticated to view this page",
        duration: 5000
      });
    } else if (message === 'session-expired') {
      toast.warning("Your session has expired", {
        description: "Please login again to continue",
        duration: 5000
      });
    } else if (message === 'logged-out') {
      toast.success("You have been logged out successfully", {
        description: "Login again to access your account",
        duration: 4000
      });
    }
  }, [message]);

  // Function to handle resending verification email
  const handleResendVerification = async (email: string) => {
    try {
      const response = await resendVerificationEmail(email);
      if (response.success) {
        toast.success(response.message, {
          icon: <Mail className="h-4 w-4" />
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      toast.error("Failed to resend verification email. Please try again.");
    }
  }

  // ✅ Google sign-in function
  const signInWithGoogle = async () => {
    try {
      setIsGoogleLoading(true)
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirect || "/dashboard",
      })
    } catch (error) {
      console.error("Google sign-in error:", error)
      toast.error("Failed to sign in with Google")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  // ✅ GitHub sign-in function
  const signInWithGitHub = async () => {
    try {
      setIsGitHubLoading(true)
      await authClient.signIn.social({
        provider: "github",
        callbackURL: redirect || "/dashboard",
      })
    } catch (error) {
      console.error("GitHub sign-in error:", error)
      toast.error("Failed to sign in with GitHub")
    } finally {
      setIsGitHubLoading(false)
    }
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const response = await signInUser(values.email, values.password);
      
      if (response.success) {
        toast.success(response.message)
        router.push(redirect || "/dashboard")
      } else {
        if (response.errorType === "EMAIL_NOT_VERIFIED" || 
            response.message.toLowerCase().includes("verify your email")) {
          
          toast.error(response.message, {
            description: "Click the button below to resend verification email",
            action: {
              label: "Resend Email",
              onClick: () => handleResendVerification(values.email)
            },
            duration: 10000,
            icon: <Mail className="h-4 w-4" />
          })
        } else {
          toast.error(response.message)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="f@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="*******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center">
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {/* ✅ Email/Password Login Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || isGoogleLoading || isGitHubLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>

                  {/* ✅ Social Login Separator */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* ✅ UPDATED: Column Layout with Full Names */}
                  <div className="flex flex-col gap-3">
                    {/* ✅ Google Login Button - Full Width with Full Name */}
                    <Button 
                      variant="outline" 
                      onClick={signInWithGoogle} 
                      type="button" 
                      className="w-full"
                      disabled={isLoading || isGoogleLoading || isGitHubLoading}
                    >
                      {isGoogleLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in with Google...
                        </>
                      ) : (
                        <>
                          <GoogleIcon className="mr-2 h-4 w-4" />
                          Continue with Google
                        </>
                      )}
                    </Button>

                    {/* ✅ GitHub Login Button - Full Width with Full Name */}
                    <Button 
                      variant="outline" 
                      onClick={signInWithGitHub} 
                      type="button" 
                      className="w-full"
                      disabled={isLoading || isGoogleLoading || isGitHubLoading}
                    >
                      {isGitHubLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in with GitHub...
                        </>
                      ) : (
                        <>
                          <GitHubIcon className="mr-2 h-4 w-4" />
                          Continue with GitHub
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
