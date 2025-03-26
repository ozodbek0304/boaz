import FormInput from "@/components/form/input"
import PhoneField from "@/components/form/phone-field"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import CheckoutCard from "./checkout-card"

type FormType = {
    full_name: string
    email: string
    phone_number: string
    socail_network: string
}

function CheckkoutPage() {
    const form = useForm<FormType>()

    async function onSubmit(values: FormType) {
        console.log(values)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white py-6 px-3 rounded-lg">
            <div className="col-span-1 order-2 lg:order-1">
                <h2 className="text-xl font-medium mb-4">
                    To'lov ma'lumotlari
                </h2>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4">
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
                    <FormInput
                        methods={form}
                        label="Bog'lanish qo'shimcha"
                        required
                        name="socail_network"
                        placeholder="telegram, watsapp "
                    />
                    <Button type="submit" className="w-full">
                        To'lov qilish
                    </Button>
                </form>
            </div>
            <div className="col-span-2 order-1 lg:order-2">
                <CheckoutCard />
            </div>
        </div>
    )
}

export default CheckkoutPage
