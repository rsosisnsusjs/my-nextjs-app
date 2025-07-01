"use client";

import React from 'react'
import { Button } from '../ui/button'
import { IconLogout } from '@tabler/icons-react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'



const AppLogOutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/login");
                }
            }
        })
    }
  return (
    <>
        <Button onClick={handleLogout} className='inline-flex justify-center gap-0.5 overflow-hidden rounded-full bg-rose-500 px-3 py-1 text-sm/6 font-medium text-white transition hover:bg-rose-700'>
            <IconLogout /> Log Out
        </Button>
    </>
  )
}

export default AppLogOutButton