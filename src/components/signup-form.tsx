"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"



const SignUpForm = () => {

    const router = useRouter();

    const handleSignUp = async () => {
        await authClient.signUp.email({
            email: "test@test.com",
            password: "password",
            name: "skibidi"
        }, {
            onRequest: (ctx) => {
                console.log("loading:", ctx.body); //show loading
            },
            onSuccess: (ctx) => {
                console.log("success:", ctx.data)//redirect to the dashboard or sign in page
                router.replace("/login");
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
        }
        )
    }
  return (
    <div>
        <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  )
}

export default SignUpForm