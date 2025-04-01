import ProductCard from "@/components/shared/product-card/product-card"
import useFilter from "@/hooks/useFilter"
import { useStore } from "@/hooks/useStore"
import Loading from "@/layouts/loading"

export default function Likeds() {
    const { store: data } = useStore<Product2[]>("likeds")
    const filtered = useFilter<Product2>(data)
    return (
        <Loading loading={false}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {filtered?.map((d, i: number) => (
                    <ProductCard p={d} key={i} isLikeds is_authenticated />
                ))}
            </div>
        </Loading>
    )
}
