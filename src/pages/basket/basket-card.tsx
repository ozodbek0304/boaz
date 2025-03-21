import DefaultImage from "@/assets/default-image.svg"
import brend from "@/assets/logo.svg"
import {
    default as CustomImage,
    default as Image,
} from "@/components/custom/image"
import { Card, CardContent } from "@/components/ui/card"
import SeeInView from "@/components/ui/see-in-view"
import { shop_id } from "@/constants/api-endpoints"
import { formatMoney } from "@/lib/format-money"
import { Link } from "@tanstack/react-router"
import Autoplay from "embla-carousel-autoplay"
import { useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import BasketActions from "./actions"

export default function BasketCard({ product }: { product: CartItem }) {
    const plugin = useRef(Autoplay({ delay: 1000 }))
    const { t } = useTranslation()

    const price = useMemo(() => {
        return (
            product.shop_prices?.find((p) => p.shop_id === shop_id)
                ?.retail_price || 0
        )
    }, [product])

    return (
        <Card key={product.id} className="p-2 sm:p-4 shadow-none border">
            <CardContent className="p-0">
                <div className="flex items-center gap-4 w-full justify-between">
                    <SeeInView url={product?.main_image_url} className="w-max">
                        <CustomImage
                            src={
                                (product?.main_image_url?.includes("https") &&
                                    product?.main_image_url) ||
                                product?.images?.[0]?.image_url ||
                                DefaultImage
                            }
                            alt="product image"
                            height={100}
                            width={100}
                            contain
                            onMouseEnter={() => plugin.current.play()}
                            onMouseLeave={() => plugin.current.stop()}
                            className="rounded-md !w-24 sm:!w-28"
                        />
                    </SeeInView>
                    <div className="w-full space-y-3">
                        <div className="flex justify-between gap-3 items-start">
                            <Link to={`/products/${product.id}` as string}>
                                <h3 className="text-base sm:text-lg font-medium">
                                    {product.name}
                                </h3>
                            </Link>
                            <Link to={`/shop`}>
                                <Image src={brend} />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <p className="font-medium text-base sm:text-lg">
                                    {formatMoney(price, "", true, t)}
                                </p>
                                <span className="line-through text-sm text-muted-foreground">
                                    {formatMoney(price, "", true, t)}
                                </span>
                            </div>
                            <BasketActions product={product} />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center  mt-6 md:hidden">
                    <div className="flex flex-col">
                        <p className="font-medium text-base sm:text-lg">
                            {formatMoney(price, "", true, t)}
                        </p>
                        <span className="line-through text-sm text-muted-foreground">
                            {formatMoney(price, "", true, t)}
                        </span>
                    </div>
                    <BasketActions product={product} />
                </div>
            </CardContent>
        </Card>
    )
}
