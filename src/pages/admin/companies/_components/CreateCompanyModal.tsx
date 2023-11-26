import { presignedUrl } from '@/apis/upload'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/Dialog'
import { Input } from '@/components/Input'
import UploadButton from '@/components/UploadButton'
import { CreateCompanySchema } from '@/utils/shema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
  onSubmit: (data) => void
  onClose: () => void
  isOpen: boolean
  onOpen: () => void
  loading: boolean
}

export default function CreateCompanyModal({
  onSubmit,
  onClose,
  isOpen,
  onOpen,
  loading
}: Props) {
  const [uploadLoading, setUploadLoading] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(CreateCompanySchema),
    defaultValues: {
      name: '',
      logo: ''
    }
  })

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen])

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      clearErrors('logo')
      setUploadLoading(true)
      const file = e.target.files?.[0]
      if (!file) return
      const { data } = await presignedUrl({
        fileName: file.name,
        type: file.type
      })
      await axios({
        url: data.uploadUrl,
        method: 'PUT',
        data: file,
        headers: {
          'Content-Type': file.type
        }
      })
      setValue('logo', data.url)
    } catch (error) {
      toast.error('Upload fail!')
    } finally {
      setUploadLoading(false)
    }
  }

  const { logo } = useWatch({
    control
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
      <DialogTrigger asChild>
        <Button variant="outline" icon={<Plus />}>
          Create Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Company</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label htmlFor="name">Name</label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="mt-1 text-red-500">{errors.name.message}</p>
            )}
            <label htmlFor="logo">Logo</label>
            {(() => {
              if (logo) {
                return (
                  <Avatar
                    size="medium"
                    url={logo}
                    alt="avatar"
                    onRemove={() => setValue('logo', '')}
                  />
                )
              }
              return (
                <UploadButton
                  id="logo"
                  isLoading={uploadLoading}
                  accept="image/*"
                  onChange={onUpload}
                />
              )
            })()}
            {errors.logo && (
              <p className="mt-1 text-red-500">{errors.logo.message}</p>
            )}
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
