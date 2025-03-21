import { useUser } from "@/constants/useUser"
import useCart from "@/hooks/useCart"
import { useConfirm } from "@/hooks/useConfirm"
import { useQueryClient } from "@tanstack/react-query"
import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import {
    GalleryVerticalEnd,
    LogIn,
    LogOut,
    Settings,
    ShoppingCart,
    User,
    Warehouse,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../custom/useLanguage"
import ParamInput from "../param/input"
import CategoryDialog from "../shared/category-dialog"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import TooltipLayout from "./tooltip-layout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export default function Header() {
    const confirm = useConfirm()
    const { is_admin, is_best_client } = useUser()
    const { t } = useTranslation()
    const { cart } = useCart()

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const pathname = useLocation().pathname
    const username = "admin"

    async function logOut() {
        const isConfirmed = await confirm({
            title: `${t("Tizimdan chiqmoqchimisiz?")}`,
        })
        if (isConfirmed) {
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
            queryClient.setQueryData(["user/"], null)
            navigate({ to: "/" })
        }
    }


    return (
        <div className="bg-background sticky top-0 left-0 right-0 z-40">
            <header className="flex flex-col backdrop-blur px-2 sm:px-4 xl:container !max-w-[1360px] mx-auto">
                <div className="flex items-center justify-between md:gap-10 py-1.5 sm:py-3">
                    <Link to="/" className="hidden md:inline">
                        <div className="flex items-center gap-1">
                            <h2 className="hidden md:inline text-3xl  font-semibold font-[Lobster] text-primary">
                                Boaz
                            </h2>
                            <h2 className="hidden md:inline text-3xl  font-semibold font-[Lobster] text-primary">
                                Market
                            </h2>
                        </div>
                    </Link>
                    <div className="flex justify-between gap-1 md:gap-0 overflow-x-auto p-0.5 w-full">
                        <div className="flex items-center gap-2 w-full max-w-3xl">
                            <CategoryDialog>
                                <Button
                                    icon={<GalleryVerticalEnd width={18} />}
                                    className="bg-primary/10 hover:bg-primary/20 text-primary font-normal">
                                    <span className="hidden xl:block">
                                        {t("Katalog")}
                                    </span>
                                </Button>
                            </CategoryDialog>

                            {pathname !== "/auth" && (
                                <ParamInput paramName="search" />
                            )}
                        </div>

                        <div className="flex flex-shrink-0 pl-2 gap-2">
                            <Link
                                to="/warehouse"
                                className="hidden md:inline"
                                activeProps={{
                                    className: "!text-primary",
                                }}>
                                {(is_best_client || is_admin) && (
                                    <Button
                                        icon={<Warehouse width={18} />}
                                        variant="ghost">
                                        <span className="hidden xl:block">
                                            {t("Ulgurchi sotib oling")}
                                        </span>
                                    </Button>
                                )}
                            </Link>
                            <div className="h-full items-center hidden md:flex">
                                <a href="tel:+998950803001" className="text-sm">
                                    +998 95 080 30 01
                                </a>
                            </div>
                            <div className="relative">
                                <Link
                                    to="/basket"
                                    className="relative hidden md:inline"
                                    activeProps={{
                                        className: "!text-primary",
                                    }}>
                                    <Button
                                        icon={<ShoppingCart width={18} />}
                                        size={"icon"}
                                        variant="ghost"></Button>
                                    {!!cart?.length && cart?.length >= 1 && (
                                        <Badge className="absolute -top-4 -right-2 z-20 overflow-visible">
                                            {cart?.length}
                                        </Badge>
                                    )}
                                </Link>
                            </div>
                            {is_admin && (
                                <TooltipLayout text={t("Admin")}>
                                    <Link
                                        to="/admin/products"
                                        className="hidden md:inline"
                                        activeProps={{
                                            className: "!text-primary",
                                        }}>
                                        <Button
                                            icon={<Settings width={18} />}
                                            variant="ghost">
                                            <span className="hidden xl:block">
                                                {t("Admin")}
                                            </span>
                                        </Button>
                                    </Link>
                                </TooltipLayout>
                            )}

                            {username ?
                                <DropdownMenu>
                                    <TooltipLayout text={username}>
                                        <DropdownMenuTrigger
                                            className="!outline-none hidden md:flex"
                                            asChild>
                                            <div>
                                                <Button
                                                    icon={<User size={20} />}
                                                    variant="ghost"
                                                    size={"icon"}
                                                    className={
                                                        (
                                                            pathname ===
                                                            "/profile"
                                                        ) ?
                                                            "text-primary"
                                                        :   ""
                                                    }></Button>
                                            </div>
                                        </DropdownMenuTrigger>
                                    </TooltipLayout>
                                    <DropdownMenuContent align="center">
                                        <DropdownMenuItem
                                            className="cursor-pointer flex items-center gap-2"
                                            asChild>
                                            <Link to="/profile">
                                                <User width={16} /> {username}
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="cursor-pointer flex items-center gap-2 !text-red-500"
                                            onClick={logOut}>
                                            <LogOut width={16} />{" "}
                                            {t("Tizimdan chiqish")}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            :   pathname !== "/auth" && (
                                    <TooltipLayout text={t("Kirish")}>
                                        <Link
                                            to="/auth"
                                            className="hidden lg_md:inline">
                                            <Button
                                                icon={<LogIn width={18} />}
                                                variant="ghost">
                                                <span className="hidden xl:block">
                                                    {t("Kirish")}
                                                </span>
                                            </Button>
                                        </Link>
                                    </TooltipLayout>
                                )
                            }
                            <div className="ml-1">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
