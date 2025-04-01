"use client"

import Image from "@/components/custom/image"
import ParamAnimatedTabs from "@/components/param/animated-tab"
import Loading from "@/layouts/loading"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

type OrderStatus =
    | "Yaratildi"
    | "Yig'ilmoqda"
    | "Yo'lda"
    | "Yetkazilgan"
    | "Topshirilgan"
    | "Bekor qilingan"
    | "To'lov qilinmagan"
type StatusColor =
    | "bg-yellow-500"
    | "bg-green-500"
    | "bg-gray-500"
    | "bg-red-500"

interface Product {
    id: string
    name: string
    size: string
    color: string
    quantity: number
    price: number
    image: string
}

interface Order {
    id: string
    orderNumber: string
    status: OrderStatus
    statusColor: StatusColor
    deliveryDate: string
    orderDate: string
    totalAmount: string
    products: Product[]
}

const ProductItem = ({ product }: { product: Product }) => (
    <div className="flex items-end justify-between border-t pt-4">
        <div className="flex items-center">
            <div className="w-24 h-24 flex justify-center items-center bg-gray-100 rounded-md overflow-hidden relative mr-4">
                <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={100}
                    height={100}
                    contain
                />
            </div>
            <div className="flex-1">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-16">Razmeri:</span>{" "}
                    <span>{product.size}</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-16">Rangi:</span>{" "}
                    <span>{product.color}</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-16">Narxi:</span>{" "}
                    <span>{product.price.toLocaleString()} so'm</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-16">Soni:</span>{" "}
                    <span>{product.quantity} ta</span>
                </div>
            </div>
        </div>
        <div className="text-start">
            <div className="font-medium">
                Jami: {(product.quantity * product.price).toLocaleString()} so'm
            </div>
        </div>
    </div>
)

const OrderDetails = ({
    order,
    isExpanded,
    onToggle,
}: {
    order: Order
    isExpanded: boolean
    onToggle: () => void
}) => (
    <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-3 gap-3">
            <div>
                <div className="text-sm text-gray-500">Buyurtma sanasi:</div>
                <div>
                    {order.orderDate} <span className="ml-4">12:45</span>
                </div>
            </div>
            <div>
                <div className="text-sm  text-gray-500">Buyurtma summasi:</div>
                <div className="font-bold">{order.totalAmount}</div>
            </div>
        </div>

        <div className="flex justify-between items-end gap-3">
            <div>
                <div className="text-sm text-gray-500">
                    Yetkazib berish sanasi:
                </div>
                <div>
                    {order.deliveryDate} <span className="ml-4">22:35</span>
                </div>
            </div>
            <button
                className="flex items-center text-sm text-gray-500"
                onClick={onToggle}>
                {isExpanded ?
                    <>
                        Yopish <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                :   <>
                        Batafsil <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                }
            </button>
        </div>

        {isExpanded && (
            <div className="space-y-4 mt-4">
                {order.products.map((product, index) => (
                    <ProductItem key={index} product={product} />
                ))}
            </div>
        )}
    </div>
)

const OrderProgressTracker = ({ order }: { order: Order }) => {
    const statusLabels = ["Yaratildi", "Yig'ilmoqda", "Yo'lda", "Topshirilgan"]
    const statusDates = ["1 Fev", "2 Fev", "5 Fev", "12 Fev"]

    const stausImage: any = {
        Yaratildi: "https://cdn-icons-png.flaticon.com/512/157/157285.png",
        "Yig'ilmoqda":
            "https://cdn-icons-png.flaticon.com/512/6259/6259277.png",
        "Yo'lda":
            "https://t3.ftcdn.net/jpg/06/20/08/12/360_F_620081258_pRxp6QuDJ8edxHh6Wajgn4tqFjLV11tP.jpg",
        Topshirilgan:
            "https://www.creativefabrica.com/wp-content/uploads/2021/09/21/Fast-Delivery-Icon-Graphics-17621993-1-1-580x386.jpg",
        "Bekor qilingan":
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9xrbouiHlSWxJZzwSe8IYnGl9AyH4owcyltYDAVV3au-9F1McrHCSInSyou4d04uVx4&usqp=CAU",
    }

    return (
        <div
            className={`p-4 border-t bg-gray-50 ${order.status === "Topshirilgan" ? "hidden" : ""}`}>
            <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2  transition-all duration-300"
                    style={{
                        width:
                            order.status === "Yaratildi" ? "0%"
                            : order.status === "Yig'ilmoqda" ? "33%"
                            : order.status === "Yo'lda" ? "66%"
                            : "Topshirilgan",
                    }}
                />

                <div className="flex justify-between relative">
                    {statusLabels.map((label, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center first:items-start last:items-end ">
                            <div
                                className={`my-2`}
                                style={{ cursor: "pointer" }}>
                                <Image
                                    src={stausImage[label]}
                                    width={32}
                                    height={32}
                                />
                            </div>

                            <div className="text-xs text-gray-500">
                                {statusDates[index]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const OrderCard = ({
    order,
    isExpanded,
    onToggle,
}: {
    order: Order
    isExpanded: boolean
    onToggle: () => void
}) => (
    <div className="border rounded-lg mb-6 overflow-hidden bg-white">
        <div className="flex justify-between items-center p-4">
            <div className="font-medium">Buyurtma #{order.orderNumber}</div>
            <div className="flex items-center text-[13px] text-gray-500">
                <div
                    className={`${order.statusColor} text-white px-3 rounded-lg`}>
                    {order.status}
                </div>
            </div>
        </div>

        <OrderProgressTracker order={order} />

        <OrderDetails
            order={order}
            isExpanded={isExpanded}
            onToggle={onToggle}
        />
    </div>
)

export default function OrdersHistory() {
    const { t } = useTranslation()
    const [expandedOrders, setExpandedOrders] = useState<{
        [key: string]: boolean
    }>({
        order1: false,
        order2: false,
        order3: false,
    })

    const toggleOrder = (orderId: string) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }))
    }

    const orders: Order[] = [
        {
            id: "order2",
            orderNumber: "2342345",
            status: "Yaratildi",
            statusColor: "bg-gray-500",
            deliveryDate: "22.03.2023",
            orderDate: "15.02.2025",
            totalAmount: "1 450 000 so'm",
            products: [
                {
                    id: "1",
                    name: "Gradient Graphic T-shirt",
                    size: "Large",
                    color: "White",
                    quantity: 1,
                    price: 450000,
                    image: "https://cdn-grocery.billz.ai/billz/87d36a3f-e5db-4779-911e-ed56b475103d.png",
                },
                {
                    id: "3",
                    name: "Skinny Fit Jeans",
                    size: "Large",
                    color: "White",
                    quantity: 2,
                    price: 200000,
                    image: "https://cdn-grocery.billz.ai/billz/87d36a3f-e5db-4779-911e-ed56b475103d.png",
                },
            ],
        },
        {
            id: "order1",
            orderNumber: "2342345",
            status: "Yig'ilmoqda",
            statusColor: "bg-yellow-500",
            deliveryDate: "22.03.2025",
            orderDate: "22.02.2025",
            totalAmount: "1 450 000 so'm",
            products: [
                {
                    id: "1",
                    name: "Gradient Graphic T-shirt",
                    size: "Large",
                    color: "White",
                    quantity: 1,
                    price: 450000,
                    image: "https://cdn-grocery.billz.ai/billz/87d36a3f-e5db-4779-911e-ed56b475103d.png",
                },
                {
                    id: "2",
                    name: "Checkered Shirt",
                    size: "Large",
                    color: "White",
                    quantity: 3,
                    price: 150000,
                    image: "https://cdn-grocery.billz.ai/billz/87d36a3f-e5db-4779-911e-ed56b475103d.png",
                },
                {
                    id: "3",
                    name: "Skinny Fit Jeans",
                    size: "Large",
                    color: "White",
                    quantity: 2,
                    price: 200000,
                    image: "https://cdn-grocery.billz.ai/billz/87d36a3f-e5db-4779-911e-ed56b475103d.png",
                },
            ],
        },
        {
            id: "order3",
            orderNumber: "2342345",
            status: "Topshirilgan",
            statusColor: "bg-green-500",
            deliveryDate: "10.01.2025 ",
            orderDate: "22.03.2024 ",
            totalAmount: "1 450 000 so'm",
            products: [
                {
                    id: "3",
                    name: "Skinny Fit Jeans",
                    size: "Large",
                    color: "White",
                    quantity: 2,
                    price: 200000,
                    image: "https://cdn-grocery.billz.ai/billz/87d36a3f-e5db-4779-911e-ed56b475103d.png",
                },
            ],
        },
    ]

    return (
        <div className="overflow-hidden">
            <ParamAnimatedTabs
                paramName="status"
                options={[
                    {
                        name: t("Barcha buyurtmalar"),
                        id: 0,
                    },
                    {
                        name: t("To'lov qilinmagan"),
                        id: "10",
                    },
                    {
                        name: t("Bekor qilingan"),
                        id: "3",
                    },
                    {
                        name: t("Yetkazilgan"),
                        id: "4",
                    },
                ]}
                wrapperClassName="flex flex-wrap gap-4 justify-center sm:max-md:block"
            />
            <Loading loading={false}>
                <div className="font-sans">
                    <h1 className="text-2xl font-bold mb-6">
                        Buyurtmalarim, (3 ta)
                    </h1>

                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            isExpanded={expandedOrders[order.id]}
                            onToggle={() => toggleOrder(order.id)}
                        />
                    ))}
                </div>
            </Loading>
        </div>
    )
}
