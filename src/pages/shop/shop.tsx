import Check from "@/assets/check.png"
import logo from "@/assets/logo.svg"
import Image from "@/components/custom/image"
import ProductCard2 from "@/components/shared/product-card/product-card"
import { useUser } from "@/constants/useUser"
import { useGet } from "@/hooks/useGet"
import LoadingSkeleton from "@/layouts/loading-skeleton"
import { Star } from "lucide-react"
import { Fade } from "react-awesome-reveal"
import { ProductsResponse } from "../home/home-products-grid"

export default function ShopPages() {
    const { data, isLoading } = useGet<ProductsResponse | undefined>("products")
    const { username } = useUser()

    return (
        <div className="min-h-screen ">
            {/* Header */}
            <div
                className={`bg-cover bg-no-repeat bg-center h-[300px] bg-[url(https://www.freightwaves.com/uploads/2020/12/122820-Volvo-VNL-parking-brake-recall.jpg)]  rounded-t-xl`}></div>

            {/* Brand Info */}
            <div className="border-b bg-white rounded-b-xl">
                <div className="p-6">
                    <div className="flex items-start gap-6">
                        <div>
                            <img
                                src={logo}
                                alt="Do'kon logosi"
                                width={100}
                                height={90}
                                loading="lazy"
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-medium hover:text-primary flex items-center gap-2">
                                <span>IMB TRUCK</span>{" "}
                                <Image src={Check} width={22} height={22} />
                            </h1>

                            <div className="flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <span>1 799  buyurtmalar</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>4.9 (336  sharhlar)</span>
                                </div>
                            </div>

                            <div className="text-sm text-gray-500 mt-1">
                                18 iyul 2025 yildan buyon ishlab kelmoqda
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        "Oila tanlovi" brendi hamyonbop narxlarda tasdiqilangan
                        sifatli mahsulotlarning keng assortimentini taqdim
                        etadi. Siz xavfsiz tovarlarni olishingiz va oilaviy
                        byudjetingizni oqilona sarflashingiz uchun biz faqat
                        o'zbeklarning sevimli ishlab chiqaruvchilari bilan
                        ishlaymiz. "Oila tanlovi" - oilaviy mahsulotlar bo'lib,
                        bunga shubha qilish mumkin emas. "Oila tanlovi" – me'r
                        va g'amxo'rlik bilan qilingan tanlovi.
                    </div>
                </div>
            </div>

            <div className="mt-8 ">
                <h1 className="mb-3 font-normal text-xl">Mahsulotlar</h1>
                {/* <div className="h-screen w-[300px] bg-blue-300"></div> */}
                <LoadingSkeleton length={6} loading={isLoading}>
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
                </LoadingSkeleton>
            </div>
        </div>
    )
}
