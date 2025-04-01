import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useCart from "@/hooks/useCart"
import { useStore } from "@/hooks/useStore"
import { Link, useSearch } from "@tanstack/react-router"
import { CheckCheck, MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

export default function RightInfo({ d }: { d: Product }) {
    const [inputValue, setInputValue] = useState(d.count || 1)
    const { store, setStore } = useStore<Product[] | any[]>("baskets")
    const { t } = useTranslation()
    const search: any = useSearch({ strict: false })
    const { addToCart, removeFromCart } = useCart()

    const s_p = useMemo(() => {
        if (!search.color) return false
        return d?.products?.find((f) => {
            if (d?.products?.length > 1) {
                return f.color === Number(search.color)
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
        addToCart(d.id, currentProduct?.id || 0)
        setInputValue(1)
    }

    const handleQuantity = useCallback(
        (action: "increase" | "decrease") => {
            if (action === "increase") {
                addToCart(d.id, currentProduct?.id || 0)
            } else removeFromCart(d.id)
        },
        [d, currentProduct],
    )

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

    return (
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
    )
}
