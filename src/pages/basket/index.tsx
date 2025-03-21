import EmptyBox from "@/components/shared/initial-data-box/empty-box"
import { Button } from "@/components/ui/button"
import useCart from "@/hooks/useCart"
import { useRequest } from "@/hooks/useRequest"
import { useStore } from "@/hooks/useStore"
import Loading from "@/layouts/loading"
import { formatMoney } from "@/lib/format-money"
import { useNavigate } from "@tanstack/react-router"
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
        navigate({ to: "/checkout" })
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
        <div className="space-y-6 overflow-hidden">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium border-b pb-2">
                {t("savatingiz")}{" "}
                {!!cart?.length ?
                    <span className="text-muted-foreground">
                        {cart?.length} {t("maxsulot")}
                    </span>
                :   ""}
            </h2>

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
                <div className=" border-t pt-2 sm:pt-4 flex sm:items-center justify-between gap-x-4 gap-y-2 flex-col sm:flex-row">
                    <div className="text-lg font-medium">
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
