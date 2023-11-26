import * as React from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/Command'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from './Button'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

export interface OptionType {
  label: string
  value: string
}

export interface ComboboxProps {
  options: OptionType[]
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  className?: string
}

function Combobox({
  options = [],
  onChange,
  value,
  className,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selected = options.find(option => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-80 justify-between h-10`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-1 flex-wrap">
            {selected ? (
              <span>{selected.label}</span>
            ) : (
              <span className="text-muted-foreground">Select an item</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map(option => (
              <CommandItem
                key={option.value}
                className="cursor-pointer"
                onSelect={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox }
