import * as React from "react"

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useNavigate } from "@tanstack/react-router"
import DetailModalContent from "./detail-modal-content"

export default function DetailModal({
    children,
    product,
}: {
    children: React.ReactNode
    product: Product
}) {
    const navigate = useNavigate()

    function handleClose(state: boolean) {
        if (!state) {
            navigate({
                search: {
                    color: undefined,
                } as any,
            })
        }
    }

    return (
        <Drawer onOpenChange={handleClose}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full">
                    <div className="p-4 pt-0">
                        <div className="flex items-center justify-center">
                            <DetailModalContent isLoading={true} product={product} />
                        </div>
                        {/* <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose> */}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
