import ProductCard2 from "@/components/shared/product-card/product-card"
import { useUser } from "@/constants/useUser"
import { useGet } from "@/hooks/useGet"
import LoadingSkeleton from "@/layouts/loading-skeleton"
import { Link, useSearch } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"

type Props = {
    title: string
    link?: string
    limit?: number
    offset?: number
    search?: string | undefined
}

export type ProductsResponse = {
    count: number
    products: Product2[]
}

export default function HomeProductsGrid({
    title = "Mahsulotlar",
    link = '',
    limit = 12,
    offset = 0,
    search,
}: Props) {
    const { t } = useTranslation()

    const searchQuery = useSearch({ from: "__root__" })

    const { data, isLoading } = useGet<ProductsResponse | undefined>(
        "products",
        {
            limit,
            offset,
            search,
        },
    )

    const { username } = useUser()

    return (
        <LoadingSkeleton length={6} loading={isLoading}>
            <div className="space-y-2 md:space-y-4">
                <Link
                    to="/categories/$category"
                    params={{ category: link }}
                    className="flex items-center gap-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                        {t(title)}
                    </h2>
                    <ChevronRight className="animate-mover " />
                </Link>
                <div className="w-full grid xmd:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-2 sm:gap-4">
                    {data?.products?.map((d, i: number) => (
                        <Fade damping={0.5} key={i}>
                            <ProductCard2
                                p={d}
                                key={i}
                                is_authenticated={!!username}
                            />
                        </Fade>
                    ))}
                </div>
                {/* {isFetchingNextPage && (
                    <div className="w-full flex justify-center py-4">
                        <Loader size="responsive" />
                    </div>
                )}
                {hasNextPage && (
                    <div className="flex items-center justify-center pt-8">
                        <Button
                            onClick={fetchNextPage}
                            size="lg"
                            variant="ghost"
                            className="!bg-background flex items-center gap-2">
                            {t("Ko'proq ko'rsatish")} <ChevronDown width={18} />
                        </Button>
                    </div>
                )} */}
            </div>
        </LoadingSkeleton>
    )
}
