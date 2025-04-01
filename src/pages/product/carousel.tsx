import DefaultImage from "@/assets/default-image.svg"
import CustomImage from "@/components/custom/image"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useMedia } from "@/hooks/useMedia"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"

export default function ProductCarousel({
    slides,
}: {
    slides: (string | undefined)[]
}) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>()
    const { xs,md } = useMedia()

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi) return
            emblaMainApi.scrollTo(index)
            setSelectedIndex(index)
        },
        [emblaMainApi],
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return
        const newIndex = emblaMainApi.selectedScrollSnap()
        setSelectedIndex(newIndex)
    }, [emblaMainApi])

    useEffect(() => {
        if (!emblaMainApi) return

        emblaMainApi.on("select", onSelect)
        emblaMainApi.on("reInit", onSelect)

        onSelect()
    }, [emblaMainApi, onSelect])

    return (
        <div className="flex flex-col-reverse md:flex-row items-start gap-2 w-full h-full  bg-white rounded-lg">
            {slides?.length >= 2 && (
                <Carousel
                    opts={{
                        align: "start",
                        dragFree: true,
                        containScroll: "trimSnaps",
                        watchDrag:true
                    }}
                    orientation={!md ? "horizontal" : "vertical"}>
                    <CarouselContent className="md:h-[532px] h-[80px] md:max-w-[350px] max-w-full  mx-auto  md:border-r  md:px-2">
                        {slides?.map((m, i) => (
                            <CarouselItem
                                key={i}
                                className={cn(
                                    "basis-auto cursor-pointer p-1 flex items-center justify-center",
                                    i == 0 && "md:mt-5 mt-0",
                                )}
                                onClick={() => onThumbClick(i)}>
                                <div
                                    className={cn(
                                        " bg-white !h-16 w-14 object-cover rounded-xl overflow-hidden p-1",
                                        selectedIndex === i &&
                                            "ring-2 ring-primary",
                                    )}>
                                    <CustomImage
                                        src={m || DefaultImage}
                                        alt={`Product image ${i}`}
                                        contain
                                        className="h-full w-full max-w-full object-contain"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
            {slides?.length > 1 ?
                <Carousel
                    className="rounded-lg max-w-full w-full h-full"
                    opts={{ loop: true, align: "start" }}
                    setApi={(emblaMainApi1) => setEmblaMainApi(emblaMainApi1)}>
                    <CarouselContent className="flex md:h-[520px] items-center h-[380px]">
                        {slides?.map((m, i) => (
                            <CarouselItem key={i} className="w-full h-full">
                                <div
                                    className={cn(
                                        "w-full h-full flex items-center justify-center object-cover rounded-xl bg-background",
                                    )}>
                                    <CustomImage
                                        src={m || DefaultImage}
                                        alt={`Product image ${i}`}
                                        contain
                                        className="h-[70%] w-full max-w-full object-contain"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 scale-125" />
                    <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 scale-125" />
                </Carousel>
            :   <div
                    className={cn(
                        "w-full h-[520px] flex items-center justify-center object-cover rounded-xl bg-background",
                    )}>
                    <CustomImage
                        src={slides[0] || DefaultImage}
                        alt={`Product image ${0}`}
                        contain
                        className="h-2/3 w-full max-w-full object-contain"
                    />
                </div>
            }
        </div>
    )
}
