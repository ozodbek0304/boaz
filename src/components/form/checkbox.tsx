import { cn } from "@/lib/utils"
import {
    Controller,
    FieldValues,
    Path,
    PathValue,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import { Checkbox } from "../ui/checkbox"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    wrapperClassName?: ClassNameValue
    hideError?: boolean
    required?: boolean
}
export default function FormCheckbox<IForm extends FieldValues>({
    methods,
    name,
    label,
    hideError = false,
    disabled,
    wrapperClassName,
}: IProps<IForm> & { disabled?: boolean }) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        defaultValue: false as PathValue<IForm, Path<IForm>>,
    })
    return (
        <fieldset>
            <Controller
                name={name}
                control={methods.control}
                render={() => (
                    <div className={cn("flex items-center gap-2 cursor-pointer", wrapperClassName)}>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled || field.disabled}
                            id={name}
                        />
                        <Label
                            htmlFor={name}
                            className={cn(!!error && "text-destructive")}
                        >
                            {label}
                        </Label>
                    </div>
                )}
            />
            {!!error && !hideError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
