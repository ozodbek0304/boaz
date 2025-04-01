import useCart from "@/hooks/useCart"
import { formatMoney } from "@/lib/format-money"
import { useTranslation } from "react-i18next"
import BasketCard from "../basket/basket-card"

type Props = {}

function CheckoutCard({}: Props) {
    const { cart, allPrice } = useCart()
    const { t } = useTranslation()

    return (
        <div className="flex flex-col justify-between h-full ">
            <div>
                <h2 className="text-xl font-medium mb-4">
                    Savatingizni ko'rib chiqing
                </h2>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                    {cart?.map((item) => <BasketCard product={item} />)}
                </div>
            </div>

            <div className=" mt-5">
                <div className="text-lg font-medium text-end">
                    {t("Jami")}:{" "}
                    {formatMoney(allPrice?.toFixed(2), undefined, true, t)}
                </div>
            </div>
        </div>
    )
}

export default CheckoutCard
