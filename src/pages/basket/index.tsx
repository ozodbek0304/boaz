import ParamAnimatedTabs from "@/components/param/animated-tab"
import EmptyBox from "@/components/shared/initial-data-box/empty-box"
import { Button } from "@/components/ui/button"
import useCart from "@/hooks/useCart"
import { useRequest } from "@/hooks/useRequest"
import { useStore } from "@/hooks/useStore"
import Loading from "@/layouts/loading"
import { formatMoney } from "@/lib/format-money"
import { useNavigate } from "@tanstack/react-router"
import { LayoutList, Package, Truck } from "lucide-react"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"
import BasketCard from "./basket-card"

export default function Basket() {
    const { setStore } = useStore<CartItem[]>("cart")
    const { cart, allPrice } = useCart()
    const { post, isPending } = useRequest()
    const navigate = useNavigate()

    const { t } = useTranslation()

    const handleSell = async () => {
        navigate({ to: "/checkout", search: { products: "take_away" } })
        // await post("order/", {
        //     carts:
        //         cart?.map((p) => ({
        //             product: p.id,
        //             quantity: p.count,
        //         })) || [],
        // })
        // setStore([])
        // toast.success(`${t("Muvaffaqiyatli amalga oshirildi")}`)
    }

    return (
        <div className="space-y-4 overflow-hidden">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium border-b pb-2">
                {t("savatingiz")}
                {", "}
                {!!cart?.length ?
                    <span className="text-muted-foreground">
                        {cart?.length} {t("maxsulot")}
                    </span>
                :   ""}
            </h2>
            <div className="w-full flex justify-between items-center ">
                <ParamAnimatedTabs
                    paramName="products"
                    wrapperClassName="p-0"
                    options={[
                        {
                            name: t("Barchasi "),
                            id: "all",
                            icon: <LayoutList className="w-5 h-5" />,
                        },
                        {
                            name: t("Do'kondan olish "),
                            id: "take_away",
                            icon: <Package className="w-5 h-5" />,
                        },
                        {
                            name: t("Yetkazib berish"),
                            id: "delivery",
                            icon: <Truck className="w-5 h-5" />,
                        },
                    ]}
                />
                <div className="text-lg font-medium text-primary border hidden lg:block  text-center p-2 sm:px-12 rounded-lg bg-white">
                    {t("Jami")}:{" "}
                    {formatMoney(allPrice?.toFixed(2), undefined, true, t)}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Loading loading={false}>
                    {cart?.map((product) => (
                        <Fade key={product?.id + "_" + product?.id}>
                            <BasketCard key={product.id} product={product} />
                        </Fade>
                    ))}
                    {!cart?.length && <EmptyBox />}
                </Loading>
            </div>

            {!!cart?.length && (
                <div className="border-t py-2 flex md:items-end justify-end gap-x-4 gap-y-2 flex-col ">
                    <div className="text-lg font-medium border text-primary  lg:hidden  text-center p-2 sm:px-12 rounded-lg bg-white">
                        {t("Jami")}:{" "}
                        {formatMoney(allPrice?.toFixed(2), undefined, true, t)}
                    </div>
                    <Button onClick={handleSell} size="lg" loading={isPending}>
                        {t("Buyurtmani amalga oshirsh")}
                    </Button>
                </div>
            )}
        </div>
    )
}
