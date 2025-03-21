import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"

export default function RightOptions() {
    return (
        <div className="w-full p-4 sm:p-6 rounded-xl space-y-4 bg-white ">
            <div>
                <p className="pb-2">
                    Rangi : <span className="font-medium">Qizil</span>
                </p>
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 4 })?.map((d, i: number) => {
                        return (
                            <Link
                                key={i}
                                disabled={i === 2}
                                className={cn(
                                    "w-max relative",
                                    i === 2 ? " opacity-50" : "",
                                )}>
                                <div
                                    className={cn(
                                        "w-16 h-20 border-2 rounded cursor-pointer p-0.5",
                                        i == 0 &&
                                            "border-primary text-foreground",
                                    )}>
                                    <img
                                        key={i}
                                        src={
                                            "https://images.uzum.uz/ce8qs22vtie1lhbeoim0/original.jpg"
                                        }
                                        alt={"salom"}
                                        className="w-full h-full object-cover rounded border"
                                    />
                                </div>
                                {i == 2 && (
                                    <span className="absolute -top-[10%] right-1/2 h-[120%] w-2 border-r-2 border-foreground/30 rotate-[30deg]"></span>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div>
                <p className="pb-2">
                    Size: <span className="font-medium">1X</span>
                </p>
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 5 })?.map((_, i: number) => {
                        return (
                            <Link
                                disabled={i == 3}
                                key={i}
                                className={cn(
                                    "w-max relative",
                                    i === 3 ? "opacity-50" : "",
                                )}>
                                <p
                                    className={cn(
                                        "px-2 py-1 border-2 rounded cursor-pointer text-muted-foreground",
                                        i == 0 &&
                                            "border-primary text-foreground",
                                    )}>
                                    {i + 1}X
                                </p>
                                {i === 3 && (
                                    <span className="absolute top-1/2 w-full border-t-2 border-foreground/30 -rotate-45"></span>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
