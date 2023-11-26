import { deleteUser, editUser, getUsers, type User } from '@/apis/users'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Card, CardTitle } from '@/components/Card'
import { DataTable } from '@/components/DataTable'
import { Input } from '@/components/Input'
import { usePersistState } from '@/hooks/usePersistState'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { PaginationState } from '@tanstack/react-table'
import debounce from 'lodash.debounce'
import { Edit, Search, Trash } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'sonner'
import CountrySelector from './_components/CountrySelector'
import EditUserModal from './_components/EditUserModal'
import CompanySelector from './_components/CompanySelector'

export default function User() {
  const queryClient = useQueryClient()
  const [country, setCountry] = useSearchParamsState('country', '')
  const [search, setSearch] = useSearchParamsState('search', '')
  const [company, setCompany] = useSearchParamsState('company', '')
  const [user, setUser] = useState<User>()
  const [{ pageIndex, pageSize }, setPagination] =
    usePersistState<PaginationState>({
      pageIndex: 0,
      pageSize: 10
    })

  const { data: users, isLoading } = useQuery(
    ['users', { search, country, pageIndex, pageSize }],
    () =>
      getUsers({
        search,
        country,
        page: pageIndex,
        limit: pageSize
      })
  )

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      toast.success('Deleted successfully!')
    }
  })

  const editUserMutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const columns = useMemo(
    () => [
      {
        header: 'Avatar',
        accessorKey: 'avatar',
        cell: column => <Avatar url={column.row.original.avatarURL} />
      },
      {
        header: 'Country',
        accessorKey: 'country.name'
      },
      {
        header: 'Company',
        accessorKey: 'company.name',
        cell: column => (
          <div className="flex gap-2 items-center">
            <Avatar url={column.row.original?.company?.logo} />
            <span> {column.row.original?.company?.name}</span>
          </div>
        )
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: column => (
          <p>
            {column.row.original.firstName + ' ' + column.row.original.lastName}
          </p>
        )
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'PhoneNumber',
        accessorKey: 'phoneNumber'
      },
      {
        header: () => <div className="text-center">Action</div>,
        accessorKey: 'action',
        cell: column => (
          <div className="flex gap-2 justify-center">
            <Button variant="outline" className="h-8 w-8 p-0">
              <Edit
                className="cursor-pointer"
                onClick={() => {
                  setUser(column.row.original)
                }}
              />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                deleteUserMutation.mutateAsync(column.row.original.id)
              }}
            >
              <Trash className="cursor-pointer text-red-500" />
            </Button>
          </div>
        )
      }
    ],
    []
  )

  const handleEditUser = async data => {
    await editUserMutation.mutateAsync(data)
    setUser(undefined)
  }

  const debouncedSearch = debounce(e => {
    setSearch(e.target.value)
  }, 400)

  return (
    <Card className="p-10 m-10 space-y-5">
      <CardTitle> User List </CardTitle>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <div className="space-y-3">
            <p className="text-muted-foreground">Select Country</p>
            <CountrySelector value={country} onValueChange={setCountry} />
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground">Select Company</p>
            <CompanySelector value={company} onChange={setCompany} />
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground">Search by Email</p>
            <Input
              defaultValue={search}
              placeholder="Search by Email"
              icon={Search}
              onChange={debouncedSearch}
            />
          </div>
        </div>
      </div>
      {user && (
        <EditUserModal
          loading={editUserMutation.isLoading}
          isOpen={!!user}
          user={user}
          onSubmit={handleEditUser}
          onClose={() => setUser(undefined)}
        />
      )}
      <DataTable
        pagination={pagination}
        onPaginationChange={setPagination}
        total={users?.data?.total ?? 0}
        loading={isLoading}
        className="mt-4"
        data={users?.data?.items ?? []}
        columns={columns}
      />
    </Card>
  )
}
