import { api } from '@/lib/axios'

interface responseShema {
  images: {
    link: string
    key: string
  }[]
}

export async function uploadImages(formData: FormData) {
  const response = await api.post<responseShema>('/all-images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.images
}
