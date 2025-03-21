import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useCart from "@/hooks/useCart"
import { useStore } from "@/hooks/useStore"
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"


function BasketActions({ product }: { product: CartItem }) {
    const { removeFromCart, addToCart, cart, removeItem } = useCart()
    const { setStore } = useStore<Product2[]>("cart")

    const currentProduct = useMemo(() => {
        return cart?.find((p) => p.id === product.id)
    }, [cart, product])

    const [inputValue, setInputValue] = useState(currentProduct?.count || 1)

    const handleQuantity = (action: "increase" | "decrease") => {
        if (!cart) return
        if (action === "increase") {
            setInputValue(Number(currentProduct?.count) + 1)
            addToCart(product)
        } else {
            removeFromCart(product.id)
            setInputValue(Number(currentProduct?.count) - 1)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (value >= 1) {
            setInputValue(value)
        } else if (e.target.value === "") {
            setInputValue(0)
        }
    }

    const handleInputBlur = () => {
        if (!cart) return
        const newcart = cart.map((item) => {
            if (item.id === product.id) {
                return { ...item, count: inputValue }
            }
            return item
        })
        setStore(newcart)
    }

    return (
        <div className="flex xsm:max-sm:max-w-[21vh] items-center gap-2 sm:max-md:gap-1 xsm:max-sm:gap-1">
            <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantity("decrease")}
                className="sm:max-md:w-8 xsm:max-sm:w-14">
                <MinusIcon width={18} />
            </Button>
            <div className="w-14 sm:w-auto">
                <Input
                    min="1"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-20 sm:max-md:w-16 text-center xsm:max-sm:w-12"
                />
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantity("increase")}
                className="sm:max-md:w-8 xsm:max-sm:w-14">
                <PlusIcon width={18} />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(product.id)}
                className="!text-destructive h-7 w-7 sm:w-10 sm:h-10 xsm:max-sm:w-14 ">
                <Trash2 width={18} />
            </Button>
        </div>
    )
}

export default BasketActions
