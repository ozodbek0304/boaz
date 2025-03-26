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
type StatusColor = "bg-yellow-500" | "bg-green-500" | "bg-gray-500" | "bg-red-500"

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
    updatedAt: string
    deliveryDate: string
    orderDate: string
    totalAmount: string
    products: Product[]
    currentStatusIndex?: number
}

const ProductItem = ({ product }: { product: Product }) => (
    <div className="flex items-center border-t pt-4">
        <div className="w-16 h-16 flex justify-center items-center bg-gray-100 rounded-md overflow-hidden relative mr-4">
            <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={64}
                height={64}
                contain
            />
        </div>
        <div className="flex-1">
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-500">Size: {product.size}</div>
            <div className="text-sm text-gray-500">Color: {product.color}</div>
        </div>
        <div className="text-right">
            <div className="font-medium">
                {product.quantity}x {product.price.toLocaleString()} so'm
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
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <div className="text-sm text-gray-500">
                    Yetkazib berish sanasi:
                </div>
                <div>{order.deliveryDate}</div>
            </div>
            <div>
                <div className="text-sm text-gray-500">Buyurtma sanasi:</div>
                <div>{order.orderDate}</div>
            </div>
        </div>

        <div className="mb-4">
            <div className="text-sm text-gray-500">Buyurtma summasi:</div>
            <div>{order.totalAmount}</div>
        </div>

        <div className="flex justify-between items-center">
            <div className="text-sm">
                Jami {order.products.length} ta maxsulot
            </div>
            <button
                className="flex items-center text-sm text-gray-500"
                onClick={onToggle}>
                {isExpanded ?
                    <>
                        Yopish <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                :   <>
                        To'liq ko'rish <ChevronDown className="ml-1 h-4 w-4" />
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

const OrderProgressTracker = ({
    currentStatus,
    setCurrentStatus,
}: {
    currentStatus: number
    setCurrentStatus: (index: number) => void
}) => {
    const statusLabels = ["Yaratildi", "Yig'ilmoqda", "Yo'lda", "Yetkazilgan"]
    const statusDates = ["1 Fev", "2 Fev", "5 Fev", "10-12 Fev"]

    return (
        <div className="p-4 border-t bg-gray-50">
            <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>

                <div className="flex justify-between relative">
                    {statusLabels.map((label, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center first:items-start last:items-end">
                            <div
                                className={`text-xs ${index <= currentStatus ? "text-green-500 font-medium" : "text-gray-500"}`}>
                                {label}
                            </div>
                            <div
                                className={`w-6 h-6 rounded-full my-2 ${
                                    index <= currentStatus ? "bg-green-500" : (
                                        "bg-gray-200"
                                    )
                                } border-2 border-white z-10`}
                                onClick={() => setCurrentStatus(index)}
                                style={{ cursor: "pointer" }}></div>
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
    currentStatus,
    setCurrentStatus,
}: {
    order: Order
    isExpanded: boolean
    onToggle: () => void
    currentStatus?: number
    setCurrentStatus?: (index: number) => void
}) => (
    <div className="border rounded-lg mb-6 overflow-hidden bg-white">
        <div className="flex justify-between items-center p-4">
            <div className="font-medium">Buyurtma #{order.orderNumber}</div>
            <div className="flex items-center text-[13px] text-gray-500">
                <div
                    className={`${order.statusColor} text-white px-3 rounded-lg`}>
                    {order.status}
                </div>
                <span className="mx-2">•</span>
                <span>Yangilangan: {order.updatedAt}</span>
            </div>
        </div>

        {currentStatus !== undefined && setCurrentStatus && (
            <OrderProgressTracker
                currentStatus={currentStatus}
                setCurrentStatus={setCurrentStatus}
            />
        )}

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

    const [currentStatus, setCurrentStatus] = useState(0)

    const toggleOrder = (orderId: string) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }))
    }

    const orders: Order[] = [
        {
            id: "order1",
            orderNumber: "2342345",
            status: "Yig'ilmoqda",
            statusColor: "bg-yellow-500",
            updatedAt: "22.03.2023 22:55",
            deliveryDate: "Dushanba 17 Mart 2025",
            orderDate: "Chorshanba 12 Mart 2025 19:35",
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
            id: "order2",
            orderNumber: "2342345",
            status: "Topshirilgan",
            statusColor: "bg-green-500",
            updatedAt: "22.03.2023 22:55",
            deliveryDate: "Dushanba 17 Mart 2025",
            orderDate: "Chorshanba 12 Mart 2025 19:35",
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
            id: "order3",
            orderNumber: "2342345",
            status: "Yaratildi",
            statusColor: "bg-gray-500",
            updatedAt: "22.03.2023 22:55",
            deliveryDate: "Dushanba 17 Mart 2025",
            orderDate: "Chorshanba 12 Mart 2025 19:35",
            totalAmount: "1 450 000 so'm",
            currentStatusIndex: currentStatus,
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
                    <h1 className="text-2xl font-bold mb-6">Buyurtmalarim</h1>

                    {orders.map((order, index) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            isExpanded={expandedOrders[order.id]}
                            onToggle={() => toggleOrder(order.id)}
                            currentStatus={
                                index === 2 ? currentStatus : undefined
                            }
                            setCurrentStatus={
                                index === 2 ? setCurrentStatus : undefined
                            }
                        />
                    ))}
                </div>
            </Loading>
        </div>
    )
}
