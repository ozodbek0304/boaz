/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { ReactNode } from "react"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import Select, {
    ActionMeta,
    ClassNamesConfig,
    components,
    MenuListProps,
    Props,
    SingleValue,
    ValueContainerProps,
} from "react-select"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

// Define base props that will be common for all SelectField instances
interface BaseSelectFieldProps<IForm extends FieldValues, Option> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    required?: boolean
    optionLabelKey?: Path<Option>
    optionValueKey?: Path<Option>
    wrapperClassName?: string
    onValueChange?: (o: SingleValue<Option>) => void
    hideError?: boolean
}

// Create a type that combines base props with react-select Props
type SelectFieldProps<
    IForm extends FieldValues,
    Option = unknown,
> = BaseSelectFieldProps<IForm, Option> &
    Omit<
        Props<Option, false>,
        keyof BaseSelectFieldProps<IForm, Option> | "isMulti"
    >

export default function SelectField<
    IForm extends FieldValues,
    Option extends Record<string, any>,
>({
    name,
    methods,
    label,
    required = false,
    optionLabelKey = "name" as Path<Option>,
    optionValueKey = "id" as Path<Option>,
    classNames,
    components: customComponents,
    wrapperClassName,
    options,
    onValueChange,
    hideError = false,
    styles,
    ...props
}: SelectFieldProps<IForm, Option>) {
    const opts = options || []
    const { control } = methods
    const {
        field: { onChange, value, disabled, ...field },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: {
            validate: (val) => {
                if (!required) return true
                return (
                    (val !== undefined && val !== null) ||
                    "Ushbu maydon majburiy"
                )
            },
        },
    })

    const currentVal =
        (opts as Option[]).find(
            (o) => o[optionValueKey as keyof Option] === value,
        ) || null

    const handleOnchange = (
        val: SingleValue<Option>,
        _actionMeta: ActionMeta<Option>,
    ) => {
        onValueChange?.(val)
        if (val) {
            onChange((val as Option)[optionValueKey as keyof Option])
        } else {
            onChange(val)
        }
    }

    return (
        <fieldset
            className={cn("flex flex-col gap-1 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(!!error && "text-destructive")}
                    required={required}
                >
                    {label}
                </Label>
            )}
            <Select<Option, false>
                getOptionLabel={(opt) =>
                    String(opt[optionLabelKey as keyof Option])
                }
                getOptionValue={(opt) =>
                    String(opt[optionValueKey as keyof Option])
                }
                components={{
                    DropdownIndicator,
                    ValueContainer,
                    MenuList,
                    ...customComponents,
                }}
                isClearable
                classNames={{
                    ...(defaultSelectClassNames as ClassNamesConfig<
                        Option,
                        false
                    >),
                    ...classNames,
                }}
                unstyled
                noOptionsMessage={() => (
                    <p className="text-sm py-1">Mavjud emas</p>
                )}
                hideSelectedOptions={false}
                closeMenuOnSelect
                placeholder={"Tanlang"}
                value={currentVal}
                onChange={(val, actionMeta) => handleOnchange(val, actionMeta)}
                options={opts}
                isDisabled={disabled}
                menuPortalTarget={document.body}
                styles={{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                        pointerEvents: "all",
                    }),
                    menuList: (base) => ({
                        ...base,
                        backgroundColor: "hsl(var(--primary-foreground))",
                        padding: "4px",
                    }),
                    ...styles,
                }}
                inputId={name}
                {...field}
                {...props}
                isMulti={false}
            />
            {!!error && !hideError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}

const defaultSelectClassNames: ClassNamesConfig = {
    control: ({
        isFocused,
        isDisabled,
    }: {
        isFocused: boolean
        isDisabled: boolean
    }) =>
        cn(
            "h-9 !min-h-[unset] flex rounded-md border border-input bg-background px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium",
            isFocused ? "outline-none ring-2 ring-ring" : "",
            isDisabled ? "opacity-50" : "",
        ),
    placeholder: () => cn("text-muted-foreground truncate"),
    clearIndicator: () => cn("text-primary"),
    menuList: () =>
        cn(
            "mt-2 p-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
        ),
    option: ({ isSelected }: { isSelected: boolean }) =>
        cn(
            "border-b last:border-none first:rounded-t-md last:rounded-b-md px-2 py-1.5 !text-sm outline-none hover:bg-secondary",
            isSelected ?
                "bg-primary/70 hover:bg-primary/70 text-background"
            :   "",
        ),
    multiValue: () =>
        cn("bg-secondary rounded-md px-[4px] py-[2px] gap-1 justify-between"),
    valueContainer: () => "gap-1",
}

const DropdownIndicator = () => (
    <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
)

const MenuList = <Option,>(props: MenuListProps<Option, false>) => {
    const { children } = props
    return <components.MenuList {...props}>{children}</components.MenuList>
}

const ValueContainer = <Option,>({
    children,
    ...props
}: ValueContainerProps<Option, false>) => {
    // eslint-disable-next-line prefer-const
    let [values, input] = children as ReactNode[]

    if (Array.isArray(values)) {
        values = `${values.length} ta tanlandi`
    }

    return (
        <components.ValueContainer {...props}>
            {values}
            {input}
        </components.ValueContainer>
    )
}
