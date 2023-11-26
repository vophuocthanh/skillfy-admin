import { request } from '@/utils/request'

interface PresignedUrlRequest {
  fileName: string
  type: string
  folderPrefix?: string
}

export const presignedUrl = (data: PresignedUrlRequest) => {
  return request.post('/upload/presigned-url', data)
}
