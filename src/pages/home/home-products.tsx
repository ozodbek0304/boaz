import ProductCard2 from "@/components/shared/product-card/product-card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { useUser } from "@/constants/useUser"
import { useGet } from "@/hooks/useGet"
import LoadingSkeleton from "@/layouts/loading-skeleton"
import { Link } from "@tanstack/react-router"
import Autoplay from "embla-carousel-autoplay"
import { ChevronRight } from "lucide-react"
import { Fade } from "react-awesome-reveal"
import { useTranslation } from "react-i18next"

type ProductsResponse = {
    count: number
    products: Product2[]
}

export default function HomeProducts({
    search,
}: {
    search?: string | undefined
}) {
    const { t } = useTranslation()

    const { data, isLoading } = useGet<ProductsResponse | undefined>(
        `products?limit=12&offset=0${search ? `&search=${search}` : ""}`,
    )

    const { username } = useUser()

    return (
        <LoadingSkeleton loading={isLoading} length={5} showTitle>
            <div className="space-y-2 md:space-y-4">
                <Link to="/categories" className="flex items-center gap-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                        {t("top mahsulotlar")}
                    </h2>
                    <ChevronRight className="animate-mover " />
                </Link>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="container relative rounded max-w-full"
                    // plugins={[
                    //     Autoplay({
                    //         delay: 3000,
                    //         stopOnFocusIn: false,
                    //         stopOnInteraction: false,
                    //     }),
                    // ]}
                    >
                    <CarouselContent className="flex">
                        {data?.products &&
                            data?.products?.map((d, i: number) => (
                                <CarouselItem
                                    className=" basis-full  xsm:basis-1/2 xmd:basis-1/2 md:basis-1/3 xl:basis-1/5 2xl:basis-1/5"
                                    key={i}>
                                    <Fade damping={0.5} key={i}>
                                        <ProductCard2
                                            xit
                                            p={d}
                                            key={i}
                                            is_authenticated={!!username}
                                        />
                                    </Fade>
                                </CarouselItem>
                            ))}
                        {/* {hasNextPage && (
                            <CarouselItem
                                className="w-0"
                                ref={hasNextPage ? ref : undefined}>
                                {isFetchingNextPage && (
                                    <div className="w-full flex justify-center py-4">
                                        <Loader size="responsive" />
                                    </div>
                                )}
                            </CarouselItem>
                        )} */}
                    </CarouselContent>
                </Carousel>
            </div>
        </LoadingSkeleton>
    )
}
