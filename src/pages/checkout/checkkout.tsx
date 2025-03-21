import FormCheckbox from "@/components/form/checkbox"
import FormInput from "@/components/form/input"
import PhoneField from "@/components/form/phone-field"
import FormSelect from "@/components/form/select"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import CheckoutCard from "./checkout-card"

type FormType = {
    full_name: string
    email: string
    phone_number: string
    address: string
    country: string
    delivery: string
    take_away: string
}

function CheckkoutPage() {
    const form = useForm<FormType>()

    async function onSubmit(values: FormType) {
        console.log(values)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white py-6 px-3 rounded-lg">
            <div>
                <h2 className="text-xl font-medium mb-4">
                    To'lov ma'lumotlari
                </h2>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <FormCheckbox
                            methods={form}
                            name="delivery"
                            label="Yetkazib berish"
                            wrapperClassName={cn(
                                "bg-background p-[10px] rounded-lg border  shadow-sm",
                                form.watch("delivery") && "border-primary",
                            )}
                            disabled={form.watch("take_away") ? true : false}
                            
                        />
                        <FormCheckbox
                            methods={form}
                            name="take_away"
                            label="Do'kondan olib ketish"
                            wrapperClassName={cn(
                                "bg-background p-[10px] rounded-lg border  shadow-sm",
                                form.watch("take_away") && "border-primary",
                            )}
                            disabled={form.watch("delivery") ? true : false}
                        />
                    </div>

                    <FormInput
                        methods={form}
                        label="F.I.O"
                        required
                        name="full_name"
                        placeholder="F.I.O"
                    />
                    <PhoneField
                        methods={form}
                        label="Telefon raqam"
                        required
                        name="phone_number"
                        placeholder="Telefon raqam"
                    />
                    <FormInput
                        methods={form}
                        required
                        label="Elektron pochta"
                        type="email"
                        name="email"
                        placeholder="Elektron pochta"
                    />
                    <FormSelect
                        methods={form}
                        options={[{ id: "1", name: "Uzbekston" }]}
                        name="country"
                        label="Tuman"
                        required
                    />
                    <Button type="submit" className="w-full">
                        To'lov qilish
                    </Button>
                </form>
            </div>
            <CheckoutCard />
        </div>
    )
}

export default CheckkoutPage
