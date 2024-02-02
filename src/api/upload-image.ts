import { api } from '@/lib/axios'

interface responseShema {
  image: {
    link: string
    key: string
  }
}

export async function uploadImage(formData: FormData) {
  const response = await api.post<responseShema>('/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.image
}
