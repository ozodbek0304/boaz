import { ProductBreadcrumb } from "@/components/shared/breadcrumb"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/constants/useUser"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { CircleUserRound, Heart, Settings, ShoppingBag } from "lucide-react"
import { useTranslation } from "react-i18next"
import Likeds from "./likeds"
import OrdersHistory from "./order"

export default function Profile() {
    const { t } = useTranslation()
    const { username } = useUser()

    const options = [
        {
            name: t("Buyurtmalar tarixi"),
            id: "orders_history",
            content: <OrdersHistory />,
            icon: <ShoppingBag width={25} />,
        },
        {
            name: t("Tanlanganlar"),
            id: "favourites",
            content: <Likeds />,
            icon: <Heart width={25} />,
        },
        {
            name: t("Sozlamalar"),
            id: "settings",
            content: <Likeds />,
            icon: <Settings width={25} />,
        },
    ]

    const navigate = useNavigate()
    const search: any = useSearch({ from: "__root__" }) as Record<
        string,
        string | undefined
    >
    const currentTab = search["page_tabs"] || options[0]?.id

    const handleTabChange = (tab: string | number) => {
        navigate({ search: { orders: tab } as any })
    }

    return (
        <Tabs
            onValueChange={handleTabChange}
            defaultValue={search["page_tabs"] || "orders_history"}>
            <ProductBreadcrumb items={[{ name: "Profil" }]} />

            <div className="flex items-start gap-2 mt-3">
                <div className="flex flex-col gap-2 max-w-[300px] w-full">
                    <Card className="shadow-none border-none p-0">
                        <CardHeader className="p-4">
                            <div className="flex items-center gap-2">
                                <CircleUserRound
                                    className="text-muted-foreground"
                                    size={32}
                                />
                                <p className="text-muted-foreground">
                                    @{username}
                                </p>
                                {/* <BadgeCheck size={16}/> */}
                                <svg
                                    aria-label="Подтвержденный"
                                    className="x1lliihq x1n2onr6"
                                    fill="rgb(0, 149, 246)"
                                    height="18"
                                    role="img"
                                    viewBox="0 0 40 40"
                                    width="18">
                                    <title>Подтвержденный</title>
                                    <path
                                        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                                        fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="shadow-none border-none p-0">
                        <CardContent className="p-0">
                            <TabsList
                                className={cn(
                                    "flex flex-col items-center justify-between h-auto gap-2 bg-transparent",
                                )}>
                                {options.map((t, i) => (
                                    <TabsTrigger
                                        key={i}
                                        data-index={t?.id}
                                        value={t.id.toString()}
                                        className={cn(
                                            "delay-75 data-[state=active]:bg-primary data-[state=active]:text-background duration-300 z-10 ease-out flex gap-2 justify-start",
                                            "w-full py-2",
                                        )}>
                                        {t.icon}
                                        {t.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </CardContent>
                    </Card>
                </div>
                {options?.map((t) => (
                    <TabsContent
                        key={t.id}
                        value={t.id.toString()}
                        className="pt-0 mt-0  w-full">
                        {t.content}
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    )
}
