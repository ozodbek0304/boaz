import SiteFooter from "@/components/footer/site-footer"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/sonner"
import { useUser } from "@/constants/useUser"
import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const { is_best_client, is_admin } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)

        if (
            !is_best_client &&
            !is_admin &&
            window.location.pathname === "/warehouse"
        ) {
            navigate({ to: "/", replace: true })
        }
    }, [is_best_client, is_admin, navigate])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-4 px-2 sm:px-4 xl:container max-w-[1360px] mx-auto">
                <Outlet />
            </main>
            <SiteFooter />
            <Toaster />
        </div>
    )
}

