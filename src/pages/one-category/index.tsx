import ProductCard2 from "@/components/shared/product-card/product-card"
import Loader from "@/components/ui/loader"
import { useUser } from "@/constants/useUser"
import { useInfiniteGet } from "@/hooks/useInfiniteGet"
import Loading from "@/layouts/loading"
import { useParams } from "@tanstack/react-router"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"

export default function OneCategory() {
    const params = useParams({ from: "/_main/categories/$category" })
    const { t } = useTranslation()

    const { data, ref, isFetchingNextPage, isLoading } =
        useInfiniteGet<Product2>(`product/?${params.category}=true`, undefined)

    const { username } = useUser()
    return (
        <Loading loading={isLoading}>
            <div className="space-y-2 md:space-y-4 overflow-hidden">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                    {t(
                        titles[
                            params.category as "most-sold" | "highest-discount"
                        ],
                    )}
                </h2>
                <div className="w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(14rem,_auto))] gap-2 sm:gap-4">
                    {data?.map((d, i: number) => (
                        <Fade damping={0.5} key={i}>
                            <ProductCard2
                                p={d}
                                key={i}
                                is_authenticated={!!username}
                            />
                        </Fade>
                    ))}
                </div>
                <div className="w-full flex justify-center py-4" ref={ref}>
                    {isFetchingNextPage && <Loader size="responsive" />}
                </div>
            </div>
        </Loading>
    )
}

const titles = {
    "most-sold": "top mahsulotlar",
    "highest-discount": "Chegirmadan bahramand bo'ling",
}
