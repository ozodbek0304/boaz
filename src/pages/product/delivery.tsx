import Check from "@/assets/check.png"
import logo from "@/assets/logo.svg"
import Image from "@/components/custom/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "@tanstack/react-router"

type Props = {}

function DeliveryComponents({}: Props) {
    const navigate = useNavigate()

    function handleNavigate(params: string) {
        navigate({ to: "/checkout", params: params })
    }
    return (
        <Card className="border-none rounded-xl p-0">
            <Link to="/shop" className="flex items-center bg-primary/10 px-6 py-4 rounded-t-xl gap-5 ">
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
                        onClick={() => handleNavigate("take_away")}
                        className="w-full bg-green-600 hover:bg-green-700">
                        Do'kondan olish
                    </Button>
                    <Button
                        onClick={() => handleNavigate("delivery")}
                        className="w-full ">
                        Yetkazib berish
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default DeliveryComponents
