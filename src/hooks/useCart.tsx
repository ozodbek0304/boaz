import { useMemo } from "react"
import { useStore } from "./useStore"
import { shop_id } from "@/constants/api-endpoints"

export default function useCart() {
    const { store, setStore } = useStore<CartItem[]>("cart", [])

    function isHaveProduct(id: string) {
        return store?.some((b) => b.id === id)
    }

    function addToCart(product: Product2) {
        const updatedCart =
            store?.map((item) =>
                item.id === product.id ?
                    { ...item, count: (item.count || 0) + 1 }
                :   item,
            ) || []

        // Agar mahsulot mavjud bo'lmasa, yangisini qo'shamiz
        if (!isHaveProduct(product.id)) {
            updatedCart.push({ ...product, count: 1 })
        }

        setStore(updatedCart.filter((item) => item.count > 0))
    }

    function removeFromCart(id: string, isAll?: boolean) {
        const updatedCart = store
            ?.map((item) =>
                item.id === id ?
                    { ...item, count: (item.count || 0) - 1 }
                :   item,
            )
            .filter((item) => item.count > 0)

        if (isAll) {
            setStore([])
        } else {
            setStore(updatedCart || [])
        }
    }
    function removeItem(id: string) {
        const updatedCart = store?.filter((item) => item.id !== id)
        setStore(updatedCart ?? [])
    }

    const allPrice = useMemo(() => {
        return (
            store?.reduce(
                (acc, item) =>
                    acc +
                    (item.shop_prices?.find((p) => p.shop_id === shop_id)
                        ?.retail_price || 0) *
                        (item.count || 1),
                0,
            ) || 0
        )
    }, [store])

    return {
        cart: store,
        addToCart,
        removeFromCart,
        isHaveProduct,
        removeItem,
        allPrice
    }
}
