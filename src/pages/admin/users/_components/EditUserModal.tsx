import { User } from '@/apis/users'
import { Button } from '@/components/Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/Dialog'
import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'

interface Props {
  onSubmit: (data) => void
  onClose: () => void
  isOpen: boolean
  onOpen?: () => void
  loading?: boolean
  user?: User
}

export default function EditUserModal({
  user,
  onSubmit,
  onClose,
  isOpen,
  onOpen,
  loading
}: Props) {
  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: user
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (open) {
          onOpen()
        } else {
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label htmlFor="firstName">First Name</label>
            <Input id="firstName" {...register('firstName')} />
            <label htmlFor="lastName">Last Name</label>
            <Input id="lastName" {...register('lastName')} />
            <label htmlFor="email">Email</label>
            <Input id="email" {...register('email')} />
            <label htmlFor="phoneNumber">Phone Number</label>
            <Input id="phoneNumber" {...register('phoneNumber')} />
            {/* <label htmlFor="country">Country</label>
            <Input id="country" {...register('country')} /> */}
            <label htmlFor="avatar">Avatar</label>
            <Input id="avatar" {...register('avatarURL')} />
          </div>
          <DialogFooter>
            <Button type="submit" isLoading={loading}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
