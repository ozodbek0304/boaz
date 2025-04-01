import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/hooks/useStore"
import { formatMoney } from "@/lib/format-money"
import { Link, useSearch } from "@tanstack/react-router"
import {
    Check,
    CheckCheck,
    MinusIcon,
    PlusIcon,
    ShoppingBag,
    ShoppingCart,
} from "lucide-react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export default function RightInfo({ d }: { d: Product }) {
    const [inputValue, setInputValue] = useState(d.count || 1)
    const { store, setStore } = useStore<Product[] | any[]>("baskets")
    const { t } = useTranslation()
    const search: any = useSearch({ from: "/_main/warehouse/$product" })

    const s_p = useMemo(() => {
        return d?.products?.find((f) => {
            if (d?.products?.length > 1) {
                return f.color === search.color
            } else if (d?.products?.length === 1) {
                return true
            }
            return true
        })?.id
    }, [search])

    const color = search.color || undefined
    const currentProduct =
        s_p ? d?.products?.find((p) => p.id === s_p) : d?.products?.[0]

    const isInBasket = useMemo(() => {
        setInputValue(
            store?.find((b) => b.id === currentProduct?.id)?.count || 1,
        )
        return store?.some(
            (b) => b.id === currentProduct?.id && b.color?.id === color,
        )
    }, [store, d, s_p, color])

    const toggleBasket = () => {
        const updatedBaskets =
            isInBasket ?
                store?.map((b) => {
                    if (currentProduct?.id === b?.id && b.color === color) {
                        return {
                            ...b,
                            count: (b.count || 0) + 1,
                        }
                    } else {
                        return b
                    }
                })
            :   [
                    ...(store || []),
                    {
                        ...currentProduct,
                        count: 1,
                        color: d?.colors?.find((d) => d.id === color),
                        main_image:
                            d?.colors?.find((d) => d.id === color)?.images?.[0]
                                ?.image || d?.main_image,
                        attr: d?.attr,
                        name: d.name,
                        desciption: d.description,
                    },
                ]
        setStore(updatedBaskets || [])
        setInputValue(1)
        !isInBasket && toast.success(d.name + `${t("savatchaga qo'shildi")}`)
    }

    const handleQuantity = (action: "increase" | "decrease") => {
        if (!store) return
        if (
            action === "decrease" &&
            store?.some((b) => b.id === currentProduct?.id && b.count === 1)
        ) {
            setStore(store?.filter((b) => b.id !== currentProduct?.id) || [])
            return
        } else {
            const newStore = store.map((item) => {
                if (item.id === currentProduct?.id) {
                    const newCount =
                        (item.count || 0) + (action === "increase" ? 1 : -1)
                    if (newCount < 0) return item
                    setInputValue(newCount)
                    return { ...item, count: newCount }
                }
                return item
            })
            setStore(newStore)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (value >= 0) {
            setInputValue(value)
        } else if (e.target.value === "") {
            setInputValue(0)
        }
    }

    const handleInputBlur = () => {
        if (!store) return
        const newStore = store.map((item) => {
            if (item.id === d?.id) {
                return { ...item, count: inputValue }
            }
            return item
        })
        setStore(newStore)
    }

    const discountedPrice =
        s_p ?
            d?.products?.find((f) => f.id === s_p)?.discounted_price
        :   d?.discounted_price

    const lastPrice =
        s_p ? d?.products?.find((f) => f.id === s_p)?.price : d?.price

    const dis = formatMoney(discountedPrice, "", true, t)
    const price = formatMoney(lastPrice, "", true, t)

    return (
        <div className="flex flex-col justify-between items-start gap-6 md:gap-8 w-full h-full lg:max-w-md border-2 p-4 sm:p-6 rounded-xl relative bg-white">
            {!!discountedPrice && (
                <p className="text-xs bg-primary text-white px-4 py-1 absolute top-0 right-0 translate-x-[1px] -translate-y-0.5 rounded-bl-xl rounded-tr-xl">
                    -
                    {Math.round(
                        ((lastPrice! - discountedPrice!) / lastPrice!) * 100,
                    )}{" "}
                    %
                </p>
            )}
            <div className="w-full">
                <div className="flex items-center gap-4 w-full justify-between">
                    <div className="flex items-center gap-2 justify-between w-full">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                            {dis}
                        </h2>
                        {!!d?.discounted_price && (
                            <p className="text-sm sm:text-base line-through text-muted-foreground">
                                {price}
                            </p>
                        )}
                    </div>
                </div>
                {/* <p className="text-sm sm:text-base text-muted-foreground pt-4">
                    {productDescription}{" "}
                </p> */}
            </div>
            <div className="w-full space-y-4">
                <div className="flex items-center gap-2">
                    <Button
                        icon={<Check width={16} />}
                        variant="secondary"
                        className="!bg-primary/20 w-8 h-8"
                    />
                    <p>
                        {t("in_stock", {
                            count:
                                s_p ?
                                    d?.products?.find((f) => f.id === s_p)
                                        ?.stock
                                :   d?.stock,
                        })}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        icon={<ShoppingBag width={16} />}
                        variant="secondary"
                        className="!bg-orange-100 w-8 h-8"
                    />
                    <p>
                        {t("in_sold", {
                            count2:
                                s_p ?
                                    d?.products?.find((f) => f.id === s_p)?.sold
                                :   d?.sold,
                        })}
                    </p>
                </div>
                <div className="relative w-full">
                    {isInBasket ?
                        <div className="flex w-full items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantity("decrease")}
                                className="sm:max-md:w-8 xsm:max-sm:w-14 ">
                                <MinusIcon width={18} />
                            </Button>
                            <Input
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className="text-center"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantity("increase")}
                                className="sm:max-md:w-8 xsm:max-sm:w-14 ">
                                <PlusIcon width={18} />
                            </Button>
                            <Link to="/basket">
                                <Button icon={<ShoppingCart width={18} />}>
                                    {t("Savatchaga o'tish")}
                                </Button>
                            </Link>
                        </div>
                    :   <div className="flex gap-2">
                            <Button
                                icon={<ShoppingCart width={18} />}
                                onClick={() => toggleBasket()}
                                className="w-full"
                                disabled={!s_p}>
                                {t("Savatchaga qo'shish")}
                            </Button>
                            <Button
                                icon={<CheckCheck width={18} />}
                                onClick={() => toggleBasket()}
                                className="w-full"
                                variant="secondary"
                                disabled={!s_p}>
                                {t("Hoziroq xarid qilish")}
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
