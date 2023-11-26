import { User } from '@/apis/users'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/Select'
import { SelectProps } from '@radix-ui/react-select'
import { useQueryClient } from 'react-query'

export default function UserSelector({ value, onValueChange }: SelectProps) {
  const queryClient = useQueryClient()

  const data = queryClient.getQueryData<{ data: User[] }>('users')

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-40" onValueChange={onValueChange}>
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.data?.map(user => (
            <SelectItem key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
