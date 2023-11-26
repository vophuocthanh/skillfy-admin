import { Company } from '@/apis/companies'
import { presignedUrl } from '@/apis/upload'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/Dialog'
import { Input } from '@/components/Input'
import UploadButton from '@/components/UploadButton'
import { CreateCompanySchema } from '@/utils/shema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
  onSubmit: (data) => void
  onClose: () => void
  isOpen: boolean
  onOpen?: () => void
  loading: boolean
  company?: Company
}

export default function EditCompanyModal({
  onSubmit,
  onClose,
  isOpen,
  onOpen,
  loading,
  company
}: Props) {
  const [uploadLoading, setUploadLoading] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(CreateCompanySchema),
    defaultValues: company
  })

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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
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
