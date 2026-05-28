import { Dispatch, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid"
import { cn } from "@/lib/utils"

interface DropDownProps {
  selected: string | number
  className?: string
  setSelected: Dispatch<React.SetStateAction<string | number>>
  items:
    | string[]
    | {
        label: string
        value: string | number
      }[]
}

const DropDown = ({
  selected,
  setSelected,
  items,
  className,
}: DropDownProps) => {
  const formattedItems = items?.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item
  )
  const selectedValue = formattedItems?.find((item) => item.value === selected)
  return (
    <div className={className}>
      <Listbox value={selected} onChange={(value) => setSelected(value)}>
        <div className="relative">
          <Listbox.Button
            className={cn(
              "relative w-full cursor-pointer rounded-md border border-input bg-card py-2 pl-3 pr-9 text-left text-sm",
              "shadow-[inset_0_1px_0_0_hsl(0_0%_0%/0.02)]",
              "transition-colors duration-150",
              "hover:border-foreground/30",
              "focus:outline-none"
            )}
          >
            <span className="block truncate text-foreground">
              {selectedValue?.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="scrollbar-hide absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover py-1 text-sm text-popover-foreground shadow-md focus:outline-none">
              {formattedItems?.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    cn(
                      "relative cursor-pointer select-none py-1.5 pl-7 pr-3 transition-colors",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground"
                    )
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cn(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-foreground">
                          <CheckIcon
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default DropDown
