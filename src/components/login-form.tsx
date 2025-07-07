"use client"

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
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();

  const handleLogin = async () => {
    await authClient.signIn.email({
                email: "admin@admin.com",
                password: "password",
                // callbackURL: "/",
            }, {
                onRequest: (ctx) => {
                    console.log("loading:", ctx.body); //show loading
                },
                onSuccess: async (ctx) => {
                    console.log("success:", ctx.data)//redirect to the dashboard or sign in page
                    // get session (client side)
                    const { data: session } = await authClient.getSession();
                    if (session?.user.role === "user") {
                      router.replace("/");
                    } else {
                      //admin
                      router.replace("/dashboard");
                    }
                },
                onError: (ctx) => {
                    // display the error message
                    alert(ctx.error.message);
                },
            }
            )
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
          <Button variant="outline" className="w-full" onClick={handleLogin}>
                  Login with Hard Code
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
