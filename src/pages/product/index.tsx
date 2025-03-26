import { ProductBreadcrumb } from "@/components/shared/breadcrumb"
import { useGet } from "@/hooks/useGet"
import Loading from "@/layouts/loading"
import { useParams } from "@tanstack/react-router"
import DOMPurify from "dompurify"
import { useEffect, useMemo } from "react"
import HomeProductsGrid from "../home/home-products-grid"
import ProductCarousel from "./carousel"
import DeliveryComponents from "./delivery"
import RightOptions from "./options"
import RightInfo from "./right-info"

export default function Product() {
    const params = useParams({ from: "/_main/products/$product" })

    const { data, isLoading } = useGet<Product2 | undefined>(
        `products/${params?.product}`,
    )

    const product = useMemo(() => {
        return data
    }, [data])

    const sanitizedHtml = useMemo(() => {
        return DOMPurify.sanitize(product?.description || ``)
    }, [product])

    const slides = useMemo(() => {
        return [
            ...(product?.images
                ?.sort(
                    (a, b) =>
                        Number(a.sequence_number) - Number(b.sequence_number),
                )
                ?.map((p) => p.image_url) || []),
        ]
    }, [product])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [params?.product])

    return (
        <Loading loading={isLoading}>
            {!!product && (
                <div className="space-y-4 sm:space-y-4">
                    <ProductBreadcrumb
                        items={[
                            { name: "Mahsulotlar", href: "/products" },
                            { name: product.name },
                        ]}
                    />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
                        {product.name} {product.sku}
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-3 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <ProductCarousel slides={(slides as any) || []} />
                            {product?.description && (
                                <div className="p-8 bg-background rounded-xl">
                                    <p
                                        className="text-sm sm:text-base text-muted-foreground"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitizedHtml,
                                        }}></p>
                                </div>
                            )}
                        </div>
                        <div className="h-full w-full lg:max-w-md flex flex-col md:flex-row lg:flex-col items-start gap-4 sm:gap-3">
                            <RightOptions />

                            <div className="flex flex-col w-full gap-3">
                                <RightInfo d={product} />
                                <DeliveryComponents d={product} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-5">
                <HomeProductsGrid
                    search={data?.name}
                    title="O'xshash mahsulotlar"
                />
            </div>
        </Loading>
    )
}
