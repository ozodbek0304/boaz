import DefaultImage from "@/assets/default-image.svg"
import CustomImage from "@/components/custom/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { shop_id } from "@/constants/api-endpoints"
import useCart from "@/hooks/useCart"
import { useRequest } from "@/hooks/useRequest"
import { useStore } from "@/hooks/useStore"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { Heart, ShoppingCart } from "lucide-react"
import { memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import XitBadge from "../xit-badge"

interface ProductCardProps {
    p: Product2
    isLikeds?: boolean
    is_authenticated: boolean
    xit?: boolean
}

function ProductCard2({ p, xit }: ProductCardProps) {
    const { t } = useTranslation()
    const { isPending } = useRequest()
    const { store: likeds, setStore: setLikeds } =
        useStore<Product2[]>("likeds")
    const { addToCart } = useCart()

    const price = useMemo(
        () =>
            p?.shop_prices?.find((p) => p.shop_id === shop_id)?.retail_price ||
            0,
        [p],
    )

    const stock = useMemo(
        () =>
            p?.shop_measurement_values?.find((p) => p.shop_id === shop_id)
                ?.total_active_measurement_value || 0,
        [p],
    )

    const isLiked = useMemo(
        () => likeds?.find((item) => item.id === p.id),
        [p, likeds],
    )

    const toggleLiked = () => {
        if (isLiked) {
            setLikeds(likeds?.filter((l) => l.id !== p.id) || [])
        } else {
            setLikeds([...(likeds || []), p])
        }
    }

    const toggleBasket = () => {
        addToCart(p)
    }

    return (
        <Card
            className="overflow-hidden  relative group hover:shadow-none duration-300 rounded-xl border-none"
            key={p.id}>
            <CardContent className="p-0">
                <Button
                    icon={
                        <Heart
                            className={cn(
                                "text-destructive w-4 sm:w-[18px]",
                                isLiked && "fill-destructive",
                            )}
                        />
                    }
                    variant="ghost"
                    className="w-7 h-7 sm:w-10 sm:h-10 absolute top-2 right-2 z-20 bg-secondary/60 rounded-full"
                    disabled={isPending}
                    onClick={toggleLiked}
                />
                <div className="relative w-full h-40 sm:h-[200px] flex items-center justify-center">
                    {xit && <XitBadge className="absolute top-2 left-2" />}
                    <Link
                        to={`/products/${p.id}`}
                        className="flex justify-center items-center">
                        <CustomImage
                            key={p.name}
                            src={p.main_image_url || DefaultImage}
                            alt="product image"
                            contain
                            height={200}
                            width={"90%"}
                            className="mix-blend-multiply group-hover:scale-[1.02] !h-40 sm:h-[200px] duration-300"
                        />
                    </Link>
                </div>
                <div className="p-2 sm:p-3 bg-zinc-50">
                    <Link to={`/products/${p.id}`}>
                        <h2 className="text-sm line-clamp-2 mb-1 leading-5">
                            {p.name}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            {stock > 0 ? t("Omborda") + ":" : ""}
                            {stock > 0 ?
                                <span className="text-foreground font-medium">
                                    {" "}
                                    {stock} {t("ta")}
                                </span>
                            :   <span className="text-foreground font-medium">
                                    {t("tugagan")}
                                </span>
                            }
                        </p>
                    </Link>
                    <div className="flex items-center justify-between pt-0 ">
                        {false ?
                            <div className="mt-2">
                                <p className="text-xs line-through text-muted-foreground">
                                    {formatMoney(price, "", true, t)}
                                </p>
                                <p className="text-xs sm:text-sm font-medium text-primary">
                                    {formatMoney(
                                        price,
                                        "text-primary px-0.5",
                                        true,
                                        t,
                                    )}
                                </p>
                            </div>
                        :   <p className="text-md sm:text-lg font-medium text-primary">
                                {formatMoney(price, " px-0.5 ", true, t)}
                            </p>
                        }
                        <div className="w-max h-max relative -mr-1">
                            <Button
                                disabled={stock === 0}
                                icon={
                                    <ShoppingCart className="w-4 sm:w-[18px]" />
                                }
                                variant="secondary"
                                className="w-7 h-7 sm:w-10 sm:h-10"
                                onClick={toggleBasket}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(ProductCard2, (prevProps, nextProps) => {
    return (
        prevProps.p.id === nextProps.p.id &&
        prevProps.isLikeds === nextProps.isLikeds
    )
})
