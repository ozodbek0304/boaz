import { useUser } from "@/constants/useUser"
import { useStore } from "@/hooks/useStore"
import { Home, List, ShoppingCart, User, Warehouse } from "lucide-react"
import AnimatedFooterTab from "../custom/footer-tabs"

export default function Footer() {
    const { username } = useUser()
    const { store: baskets } = useStore<Product[]>("baskets")
    const { store: likeds } = useStore<number[]>("likeds")
    return (
        <nav className="md:hidden w-full  bg-background/60 sm:px-4 ">
            <AnimatedFooterTab
                options={[
                    {
                        name: "Bosh sahifa",
                        id: "/",
                        icon: <Home width={25} />,
                    },
                    {
                        name: "Kategoriyalar",
                        id: "/categories",
                        icon: <List width={25} />,
                    },
                    {
                        name: "Ulgurchi",
                        id: "/warehouse",
                        icon: <Warehouse width={25} />,
                    },
                    {
                        name: "Savatcha",
                        id: "/basket",
                        icon: <ShoppingCart width={25} />,
                        badge: baskets?.length,
                    },
                    {
                        name: "Profil",
                        id: username ? "/profile" : "/auth",
                        icon: <User width={25} />,
                        badge: likeds?.length,
                    },
                ]}
            />
        </nav>
    )
}
