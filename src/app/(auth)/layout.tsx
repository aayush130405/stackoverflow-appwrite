"use client"

import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";

const Layout = ({children} : {children: React.ReactNode}) => {
    const {session} = useAuthStore()        //checking if there is already a session
    const router = useRouter()      //creating router

    useEffect(() => {
        if(session) {
            router.push("/")
        }
    }, [session, router])

    if(session) {
        return null
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
            <BackgroundBeams />
            <div className="relative">{children}</div>
        </div>
    )
}

export default Layout