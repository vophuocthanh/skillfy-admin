import { getCountries } from '@/apis/countries'
import { Input } from '@/components/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from '@/components/Select'
import { SelectProps } from '@radix-ui/react-select'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useInfiniteQuery } from 'react-query'

export default function CountrySelector({ value, onValueChange }: SelectProps) {
  const [search, setSearch] = useState('')

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['countries', search],
    queryFn: ({ queryKey, pageParam }) =>
      getCountries({ q: queryKey[1], pageParam }),
    getNextPageParam: lastPage => {
      return lastPage.data.page + 1
    }
  })

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLDivElement
    if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
      fetchNextPage()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-60" onValueChange={onValueChange}>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <Input
          icon={Search}
          placeholder="Search by name"
          onChange={handleChange}
          value={search}
        />
        <SelectGroup
          onScroll={handleScroll}
          className="overflow-y-auto min-h-[15rem] h-[15rem]"
        >
          {data?.pages?.map(
            page =>
              page.data.items?.map(country => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))
          )}
          {isFetching && (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
