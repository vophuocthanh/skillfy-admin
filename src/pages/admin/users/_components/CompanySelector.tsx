import { getCompanies } from '@/apis/companies'
import { Button } from '@/components/Button'
import { ComboboxProps } from '@/components/Combobox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import { ChevronsUpDown, X } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'react-query'

type CompanySelectorProps = Omit<ComboboxProps, 'options'>

export default function CompanySelector({
  value,
  onChange
}: CompanySelectorProps) {
  const { data } = useQuery('companies', () => getCompanies({}))
  const [open, setOpen] = useState(false)
  const options = data?.data?.items || []

  const selected = options.find(option => option.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-80 justify-between h-10 group`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-1 flex-wrap">
            {selected ? (
              <div className="flex gap-2 items-center">
                <img
                  src={selected.logo}
                  alt={selected.name}
                  className="w-8 h-8"
                />
                <span>{selected.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Select an item</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 hover:hidden group-hover:hidden" />
          <X
            onPointerDown={e => {
              e.preventDefault()
              e.stopPropagation()
              onChange?.('')
            }}
            className="z-50 h-4 w-4 opacity-50 hidden group-hover:block group-hover:opacity-100"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map(option => (
              <CommandItem
                key={option.id}
                className="cursor-pointer flex gap-2"
                onSelect={() => {
                  onChange(option.id)
                  setOpen(false)
                }}
              >
                <img src={option.logo} alt={option.name} className="w-8 h-8" />
                <span>{option.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
