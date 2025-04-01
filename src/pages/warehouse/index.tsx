import ProductCard from "@/components/shared/product-card/product-card"
import Loader from "@/components/ui/loader"
import { useUser } from "@/constants/useUser"
import { useInfiniteGet } from "@/hooks/useInfiniteGet"
import Loading from "@/layouts/loading"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"

export default function Warehouse() {
    const { data, ref, isFetchingNextPage, isLoading } =
        useInfiniteGet<Product2>("base-product/?highest_discount=true")
    const { username } = useUser()
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium border-b pb-2">
                {t("ulgurchi sotib oling va katta chegirmalarga ega bo'ling")}
            </h2>

            <Loading loading={isLoading}>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-2 sm:gap-4">
                    {data?.map((product) => (
                        <Fade damping={0.5} key={product.id}>
                            <ProductCard
                                key={product.id}
                                p={product}
                                is_authenticated={!!username}
                            />
                        </Fade>
                    ))}
                    <div className="w-full flex justify-center py-4" ref={ref}>
                        {isFetchingNextPage && <Loader size="responsive" />}
                    </div>
                </div>
            </Loading>
        </div>
    )
}
