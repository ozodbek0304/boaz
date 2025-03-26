import Check from "@/assets/check.png"
import logo from "@/assets/logo.svg"
import Image from "@/components/custom/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { shop_id } from "@/constants/api-endpoints"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "@tanstack/react-router"
import { Package, Truck } from "lucide-react"

function DeliveryComponents({ d }: { d: Product2 }) {
    const navigate = useNavigate()

    function handleNavigate(params: string) {
        navigate({ to: "/checkout", params: params })
    }

    const count =
        d?.shop_measurement_values?.find((f) => f.shop_id === shop_id)
            ?.total_active_measurement_value || 0
            
    return (
        <Card className="border-none rounded-xl p-0">
            <Link
                to="/shop"
                className="flex items-center bg-primary/10 px-6 py-4 rounded-t-xl gap-5 ">
                <img
                    src={logo}
                    alt="Do'kon logosi"
                    width={100}
                    height={90}
                    loading="lazy"
                    className="rounded-lg"
                />
                <CardTitle className="text-xl font-medium hover:text-primary flex items-center gap-2">
                    <span>IMB TRUCK</span>{" "}
                    <Image src={Check} width={22} height={22} />
                </CardTitle>
            </Link>
            <CardContent className=" p-6">
                <div className="flex items-center justify-between gap-3">
                    <Button
                        icon={<Package />}
                        disabled={count === 0}
                        onClick={() => handleNavigate("take_away")}
                        className={cn(
                            "w-full",
                            count === 0 ?
                                "bg-orange-500 cursor-not-allowed"
                            :   "bg-lime-500 hover:bg-lime-600",
                        )}>
                        Do'kondan olish
                    </Button>
                    <Button
                        icon={<Truck />}
                        onClick={() => handleNavigate("delivery")}
                        disabled={count !== 0}
                        className={cn(
                            "w-full",
                            count !== 0 ?
                                "bg-orange-500 cursor-not-allowed"
                            :   "bg-lime-500 hover:bg-lime-600",
                        )}>
                        Yetkazib berish
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default DeliveryComponents
